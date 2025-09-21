package io.github.eletropronto.demo.controller.mapper;
import io.github.eletropronto.demo.controller.dto.AddressDTO;
import io.github.eletropronto.demo.model.Address;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AddressMapper {
    Address toEntity(AddressDTO dto);
    AddressDTO toDTO(Address address);
}
