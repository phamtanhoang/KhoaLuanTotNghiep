package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
}

