package io.github.eletropronto.demo.controller.dto;
import jakarta.validation.constraints.NotBlank;

public record AddressDTO(
        @NotBlank(message = "The field cannot be null") Long id,
        @NotBlank(message = "The field cannot be null") String code,
        @NotBlank(message = "The field cannot be null") String state,
        @NotBlank(message = "The field cannot be null") String city,
        @NotBlank(message = "The field cannot be null") String number
) {
}
