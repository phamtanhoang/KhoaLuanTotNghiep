package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.EApplyStatus;

public record StepResultRequest(EApplyStatus status, String result) {
}
