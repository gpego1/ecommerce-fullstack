package io.github.eletropronto.demo.controller.dto;
import io.github.eletropronto.demo.model.Product;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDTO(
        Long id,
        @NotBlank(message = "Required data") String nameProduct,
        @NotBlank(message = "Required data") String description,
        @NotNull(message = "Required data") Double price,
        @NotBlank(message = "Required data") String image
) {
}
