package io.github.eletropronto.demo.controller.mapper;
import io.github.eletropronto.demo.controller.dto.ProductDTO;
import io.github.eletropronto.demo.model.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    Product toEntity(ProductDTO dto);
    ProductDTO toDTO(Product product);
}
