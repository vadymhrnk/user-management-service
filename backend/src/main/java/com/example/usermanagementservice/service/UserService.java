package com.example.usermanagementservice.service;

import com.example.usermanagementservice.dto.CreateUserRequestDto;
import com.example.usermanagementservice.dto.UserResponseDto;
import com.example.usermanagementservice.dto.UsersWithTotalPagesDto;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserResponseDto save(CreateUserRequestDto requestDto);

    UserResponseDto updateById(Long id, CreateUserRequestDto requestDto);

    void deleteById(Long id);

    UsersWithTotalPagesDto getAllUsersWithTotalPages(Pageable pageable);

    UsersWithTotalPagesDto searchUsersByName(String name, Pageable pageable);
}
