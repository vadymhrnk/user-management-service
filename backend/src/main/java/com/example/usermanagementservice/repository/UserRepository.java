package com.example.usermanagementservice.repository;

import com.example.usermanagementservice.model.User;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Page<User> findByFirstNameContainingIgnoreCase(String firstName, Pageable pageable);
}
