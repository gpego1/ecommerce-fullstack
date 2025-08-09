package io.github.eletropronto.demo.controller.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AuthRequest {
    @NotBlank(message = "required") private String username;

    @NotBlank(message = "required") private String password;
}
