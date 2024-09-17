package com.example.usermanagementservice.controller;

import com.example.usermanagementservice.dto.CreateUserRequestDto;
import com.example.usermanagementservice.dto.UserResponseDto;
import com.example.usermanagementservice.dto.UsersWithTotalPagesDto;
import com.example.usermanagementservice.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "User manager", description = "Endpoints to manage users")
@RestController
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    @Operation(summary = "Create a new user", description = "Create a new user")
    public UserResponseDto addUser(@RequestBody @Valid CreateUserRequestDto requestDto) {
        return userService.save(requestDto);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a user", description = "Update an existing user by ID")
    public UserResponseDto updateUser(
            @PathVariable Long id,
            @RequestBody @Valid CreateUserRequestDto requestDto
    ) {
        return userService.updateById(id, requestDto);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a user", description = "Delete a user by ID")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteById(id);
    }

    @GetMapping
    @Operation(
            summary = "Get all users",
            description = "Get a list of all users"
    )
    public UsersWithTotalPagesDto getAllUsers(Pageable pageable) {
        return userService.getAllUsersWithTotalPages(pageable);
    }

    @GetMapping("/search")
    @Operation(
            summary = "Search users by name",
            description = "Get a list of all users filtered by name"
    )
    public UsersWithTotalPagesDto getAllUsersByName(@RequestParam String name, Pageable pageable) {
        return userService.searchUsersByName(name, pageable);
    }
}
