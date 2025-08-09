package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.AuthRequest;
import io.github.eletropronto.demo.controller.dto.AuthResponse;
import io.github.eletropronto.demo.controller.dto.UserDTO;
import io.github.eletropronto.demo.controller.mapper.UserMapper;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.security.CustomAuthenticationProvider;
import io.github.eletropronto.demo.security.CustomUserDetailsService;
import io.github.eletropronto.demo.security.JwtUtil;
import io.github.eletropronto.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService userDetailsService;
    private final UserService userService;
    private final UserMapper mapper;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDTO dto){
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
}


