package io.github.eletropronto.demo.controller;
import io.github.eletropronto.demo.controller.dto.UserDTO;
import io.github.eletropronto.demo.controller.mapper.UserMapper;
import io.github.eletropronto.demo.model.User;
import io.github.eletropronto.demo.repository.UserRepository;
import io.github.eletropronto.demo.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor

public class UserController {

    private final UserService service;
    private final UserRepository repository;
    private final UserMapper mapper;

    @GetMapping
    public List<User> listAll(){
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findDetails(@PathVariable Long id){
        return service.findById(id)
                .map(user -> {
                    UserDTO dto = mapper.toDTO(user);
                    return ResponseEntity.ok(dto);
                }).orElseGet( () -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid UserDTO dto){
        User objUser = mapper.toEntity(dto);
        service.save(objUser);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(objUser.getId())
                .toUri();

        return ResponseEntity.created(location).build();

    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UserDTO dto){
        Optional<User> foundedUser = service.findById(id);

        if(foundedUser.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        User user = foundedUser.get();
        user.setName(dto.name());
        user.setUsername(dto.username());
        user.setPassword(dto.password());
        user.setRoles(dto.roles());
        service.updateUser(user);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        Optional<User> foundedUser = service.findById(id);

        if(foundedUser.isEmpty()){
            return ResponseEntity.notFound().build();
        }

        service.deleteUser(foundedUser.get());
        return ResponseEntity.noContent().build();

    }
}
