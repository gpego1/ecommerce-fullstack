package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.AuthRequest;
import io.github.eletropronto.demo.controller.dto.AuthResponse;
import io.github.eletropronto.demo.controller.dto.UserDTO;
import io.github.eletropronto.demo.controller.mapper.UserMapper;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.security.CustomAuthenticationProvider;
import io.github.eletropronto.demo.security.CustomUserDetailsService;
import io.github.eletropronto.demo.security.JwtUtil;
import io.github.eletropronto.demo.service.AuthService;
import io.github.eletropronto.demo.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    @Value("${file.upload-pfp-dir}")
    private String uploadDir;

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;
    private final UserMapper mapper;
    private final AuthService authService;


    // Métodos de GET
    //
    @GetMapping("/users/me")
    public ResponseEntity<UserResponseDTO> getUserDetails(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            String userUsername = authService.getEmailFromToken(token);
            if (userUsername != null) {
                User user = userService.getUserByUsername(userUsername).orElse(null);
                if (user != null) {
                    UserResponseDTO dto = UserResponseDTO.builder()
                            .id(user.getId())
                            .name(user.getName())
                            .username(user.getUsername())
                            .bio(user.getBio())
                            .phone(user.getPhone())
                            .registerDate(user.getRegisterDate())
                            .role(user.getRoles().toString())
                            .build();
                    return ResponseEntity.ok(dto);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @GetMapping("image/{idUser}/{fileName}")
    public ResponseEntity<Resource> getProductImage(@PathVariable Long idUser, @PathVariable String fileName) throws IOException {

        String subPath = idUser + "/" + fileName;
        Path filePath = Paths.get(uploadDir).toAbsolutePath().resolve(subPath).normalize();

        System.out.println("Caminho do Arquivo sendo procurado: " + filePath.toString());

        Resource resource;
        try {
            resource = new UrlResource(filePath.toUri());
        } catch(IOException e) {
            return ResponseEntity.notFound().build();
        }
        if(!resource.exists() || !resource.isReadable()){
            return ResponseEntity.notFound().build();
        }
        String contentType = "application/octet-stream";
        if(fileName.toLowerCase().endsWith(".png")) {
            contentType = MediaType.IMAGE_PNG_VALUE;
        } else if (fileName.toLowerCase().endsWith(".jpg")){
            contentType = MediaType.IMAGE_JPEG_VALUE;
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, "inliene; filename")
                .body(resource);
    }

    // Metodos POST'S
    //
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO dto) {
        User userToCreate = mapper.toEntity(dto);
        User createdUser = userService.save(userToCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
    }


    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
        final String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/upload/{userId}")
    public ResponseEntity<String> productFileUpload(@PathVariable Long userId, @RequestParam("file") MultipartFile file){

        if(file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please send a product picture");
        }
        if(userId == null || userId <= 0){
            return ResponseEntity.badRequest().body("The product doesn't exists");
        }
        try {
            String subPath = userService.uploadProfileImage(file, userId);
            return ResponseEntity.ok().body("File upload successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Fail to upload product file");
        }
    }


    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserResponseDTO {
        Long id;
        String name;
        String username;
        String bio;
        String phone;
        LocalDateTime registerDate;
        String role;
        String profilePicture;
    }
}


