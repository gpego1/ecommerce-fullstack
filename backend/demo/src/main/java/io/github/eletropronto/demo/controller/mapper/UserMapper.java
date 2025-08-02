package io.github.eletropronto.demo.controller.mapper;

import io.github.eletropronto.demo.controller.dto.UserDTO;
import io.github.eletropronto.demo.model.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(UserDTO dto);
    UserDTO toDTO(User user);

}
