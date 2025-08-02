package io.github.eletropronto.demo.controller.dto;
import io.github.eletropronto.demo.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserDTO(
        Long id,
        @NotBlank(message = "Required data") String name,
        @NotBlank(message = "Required data") String email,
        @NotBlank(message = "Required data") String password
){
}
