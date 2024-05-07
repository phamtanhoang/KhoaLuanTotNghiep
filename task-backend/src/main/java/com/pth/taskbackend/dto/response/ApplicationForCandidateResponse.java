package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record ApplicationForCandidateResponse(String id, LocalDateTime created, JobApplicationResponse job, EmployerApplicationResponse employer) {
}
