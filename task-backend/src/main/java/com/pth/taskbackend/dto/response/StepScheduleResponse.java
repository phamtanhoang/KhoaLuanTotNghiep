package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.model.meta.Application;
import java.time.LocalDateTime;
public record StepScheduleResponse(String id,
                                   String name,
                                   int stepNumber,
                                   String color,
                                   LocalDateTime startDate,
                                   LocalDateTime endDate,
                                   Application application,
                                   JobResponse job) {
}
