package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.model.meta.Employer;

import java.time.LocalDateTime;

public record HomeJobResponse(String id,
                              LocalDateTime created,
                              LocalDateTime toDate,
                              String name,
                              Employer employer) {
}
