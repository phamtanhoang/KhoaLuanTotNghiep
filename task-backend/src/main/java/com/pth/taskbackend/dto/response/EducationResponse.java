package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record EducationResponse(String id, LocalDateTime created, LocalDateTime updated,String fromDate, String toDate, String education, int sequence, String description, String candidateId) {
}
