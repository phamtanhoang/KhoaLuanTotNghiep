package com.pth.taskbackend.dto.response;

public record BaseResponse(String Message, int Status, Object Data) {
}

