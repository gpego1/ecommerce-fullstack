package io.github.eletropronto.demo.controller.dto;
import io.github.eletropronto.demo.model.Roles;
import io.github.eletropronto.demo.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.validator.constraints.br.CPF;

import java.util.List;

public record UserDTO(
        Long id,
        @NotBlank(message = "Required data") String name,
        @NotBlank(message = "Required data") @Email String email,
        @NotBlank(message = "Required data") String password,
        List<Roles> roles
){
}
