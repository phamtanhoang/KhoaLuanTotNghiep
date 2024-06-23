package com.pth.taskbackend.dto.request;

import java.time.LocalDateTime;

public record ScheduleRequest(String name,
                              LocalDateTime startDate,
                              long hour,
                              String color,
                              String description) {
}
