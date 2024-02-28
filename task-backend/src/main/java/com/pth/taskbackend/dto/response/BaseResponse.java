package com.pth.taskbackend.dto.response;

public record BaseResponse(String message, int status, Object data) {
}

