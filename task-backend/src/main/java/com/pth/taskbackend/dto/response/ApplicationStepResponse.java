package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EStepStatus;

public record ApplicationStepResponse(String id, String name, Integer number, EStepStatus status, String result, String applicationId) {
}
