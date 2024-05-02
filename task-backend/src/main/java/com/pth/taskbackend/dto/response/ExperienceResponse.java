package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record ExperienceResponse(String id, LocalDateTime created, LocalDateTime updated, String fromDate, String toDate, String experience, int sequence, String description, String candidateId) {
}
