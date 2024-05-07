package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record CreateApplicationResponse(String id,
                                        LocalDateTime created,
                                        String fullName,
                                        String email,
                                        String phoneNumber,
                                        String letter,
                                        String cV,

                                        JobApplicationResponse job, EmployerApplicationResponse employer) {
}
