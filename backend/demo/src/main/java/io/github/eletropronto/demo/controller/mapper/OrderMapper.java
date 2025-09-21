package io.github.eletropronto.demo.controller.mapper;
import io.github.eletropronto.demo.controller.dto.OrderDTO;
import io.github.eletropronto.demo.model.Order;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface OrderMapper {

    Order toEntity(OrderDTO dto);
    OrderDTO toDTO(Order order);
}
