package com.pth.taskbackend.service;

import com.pth.taskbackend.dto.response.BaseResponse;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.security.UserInfoDetails;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface AuthService {
    UserInfoDetails login(
            String username,
            String password,
            HttpServletRequest request,
            HttpServletResponse response
    );

    Optional<User> register(
            String username,
            String password,
            ERole role
    );
    String refresh(
            String refreshToken,
            HttpServletRequest request,
            HttpServletResponse response
    );
    void logout(
            HttpServletRequest request,
            HttpServletResponse response
    );
    void changePassword(
            Optional<User> user,
            String newPassword
    );
}
