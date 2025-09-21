package io.github.eletropronto.demo.controller.dto;
import io.github.eletropronto.demo.model.Product;
import io.github.eletropronto.demo.model.Status;
import io.github.eletropronto.demo.model.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record OrderDTO(
        @NotNull(message = "The field cannot be null") Long id,
        @NotNull(message = "The field cannot be null") User client,
        @NotNull(message = "The field cannot be null") List<Product> products,
        @NotBlank(message = "The field cannot be null") Status status) {
}
