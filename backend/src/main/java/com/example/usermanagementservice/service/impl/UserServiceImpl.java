package com.example.usermanagementservice.service.impl;

import com.example.usermanagementservice.dto.CreateUserRequestDto;
import com.example.usermanagementservice.dto.UserResponseDto;
import com.example.usermanagementservice.dto.UsersWithTotalPagesDto;
import com.example.usermanagementservice.exception.EmailAlreadyExistsException;
import com.example.usermanagementservice.exception.EntityNotFoundException;
import com.example.usermanagementservice.mapper.UserMapper;
import com.example.usermanagementservice.model.User;
import com.example.usermanagementservice.repository.UserRepository;
import com.example.usermanagementservice.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    public static final String NO_USER_WITH_SUCH_ID_MESSAGE = "Can't find user with id: ";
    public static final String EMAIL_ALREADY_EXISTS_MESSAGE = "User already exists with an email: ";

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    public UserResponseDto save(CreateUserRequestDto requestDto) {
        User user = userMapper.toModel(requestDto);

        checkIfEmailAlreadyExists(user.getEmail());

        return userMapper.toResponseDto(userRepository.save(user));
    }

    @Override
    public UserResponseDto updateById(Long id, CreateUserRequestDto requestDto) {
        User user = userRepository.findById(id)
                .orElseThrow(
                        () -> new EntityNotFoundException(NO_USER_WITH_SUCH_ID_MESSAGE + id)
                );

        if (!user.getEmail().equals(requestDto.getEmail())) {
            checkIfEmailAlreadyExists(requestDto.getEmail());
        }

        user.setFirstName(requestDto.getFirstName());
        user.setLastName(requestDto.getLastName());
        user.setEmail(requestDto.getEmail());

        User updatedUser = userRepository.save(user);

        return userMapper.toResponseDto(updatedUser);
    }

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UsersWithTotalPagesDto getAllUsersWithTotalPages(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);
        return userMapper.toResponseWithTotalPagesDtoList(users);
    }

    @Override
    public UsersWithTotalPagesDto searchUsersByName(String name, Pageable pageable) {
        Page<User> users = userRepository.findByFirstNameContainingIgnoreCase(name, pageable);
        return userMapper.toResponseWithTotalPagesDtoList(users);
    }

    private void checkIfEmailAlreadyExists(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new EmailAlreadyExistsException(EMAIL_ALREADY_EXISTS_MESSAGE + email);
        }
    }
}
