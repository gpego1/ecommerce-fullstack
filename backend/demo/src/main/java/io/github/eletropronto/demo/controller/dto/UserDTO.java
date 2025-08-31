package io.github.eletropronto.demo.controller.dto;
import io.github.eletropronto.demo.model.Roles;
import io.github.eletropronto.demo.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDateTime;
import java.util.List;

public record UserDTO(
        Long id,
        @NotBlank(message = "Required data") String name,
        @NotBlank(message = "Required data") @Email String username,
        @NotBlank(message = "Required data") String password,
        String phone,
        String bio,
        LocalDateTime registerDate,
        LocalDateTime lastUpdateDate,
        String profilePicture,
        List<Roles> roles
){
}
