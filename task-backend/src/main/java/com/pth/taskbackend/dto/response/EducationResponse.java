package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record EducationResponse(String id, LocalDateTime created, LocalDateTime updated,LocalDateTime fromDate, LocalDateTime toDate, String education, int sequence, String description, String candidateId) {
}
