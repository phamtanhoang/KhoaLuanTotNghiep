package com.pth.taskbackend.dto.response;


import java.time.LocalDateTime;

public record MessageResponse(String id, String applicationId, LocalDateTime created, String content, String file, String userId, String userName, String avatar) {
}
