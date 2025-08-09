package io.github.eletropronto.demo.controller.dto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Auth {
    @NotBlank(message = "Required field E-mail")
    private String email;

    @NotBlank(message = "Required field Password")
    private String senha;
}
