package com.pth.taskbackend.dto.request;

import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDateTime;

public record StepScheduleRequest(String name,
                                  LocalDateTime startDate,
                                  long hour,
                                  String color,
                                  int stepNumber) {
}
