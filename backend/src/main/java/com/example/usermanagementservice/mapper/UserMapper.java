package com.example.usermanagementservice.mapper;

import com.example.usermanagementservice.config.MapperConfig;
import com.example.usermanagementservice.dto.CreateUserRequestDto;
import com.example.usermanagementservice.dto.UserResponseDto;
import com.example.usermanagementservice.dto.UsersWithTotalPagesDto;
import com.example.usermanagementservice.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(config = MapperConfig.class)
public interface UserMapper {
    UserResponseDto toResponseDto(User user);

    User toModel(CreateUserRequestDto requestDto);

    @Mapping(
            target = "users",
            source = "content",
            defaultExpression = "java(java.util.List.of())"
    )
    UsersWithTotalPagesDto toResponseWithTotalPagesDtoList(Page<User> users);
}
