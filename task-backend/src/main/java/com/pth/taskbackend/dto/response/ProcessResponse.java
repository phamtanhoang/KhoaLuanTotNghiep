package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.model.meta.Step;

import java.time.LocalDateTime;
import java.util.List;

public record ProcessResponse(
        String id,
        LocalDateTime created,
        LocalDateTime updated,
        String name,
        String description,
        List<StepResponse> step
) {
}
