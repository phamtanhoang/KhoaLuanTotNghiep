package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EStatus;

import java.time.LocalDateTime;

public record EmployerResponse(String id,
                               LocalDateTime created,
                               LocalDateTime updated,
                               String image,
                               String backgroundImage,
                               String name,
                               String location,
                               String phoneNumber,
                               String businessCode,
                               String description,
                               String email,
                               EStatus status,
                               String userId) {
}
