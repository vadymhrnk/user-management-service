package com.example.usermanagementservice.dto;

import com.example.usermanagementservice.model.User;
import java.util.List;
import lombok.Data;

@Data
public class UsersWithTotalPagesDto {
    private List<User> users;

    private int totalPages;
}
