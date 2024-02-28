package com.pth.taskbackend.service;

import com.pth.taskbackend.dto.response.BaseResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    BaseResponse login(String username, String password, HttpServletRequest request, HttpServletResponse response);
    BaseResponse register(String username, String password);
    BaseResponse refresh(String refreshToken, HttpServletRequest request, HttpServletResponse response);
    BaseResponse logout(HttpServletRequest request, HttpServletResponse response);
}
