package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;

import java.time.LocalDateTime;

public record ApplicationForEmployerResponse(String id, String name, String email, LocalDateTime created, EApplyStatus status, JobApplicationResponse job) {
}
