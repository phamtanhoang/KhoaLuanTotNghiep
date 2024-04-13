package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;

public record LoginResponse(String id, LocalDateTime created, LocalDateTime updated, String email, ERole role, EStatus status) {
}
