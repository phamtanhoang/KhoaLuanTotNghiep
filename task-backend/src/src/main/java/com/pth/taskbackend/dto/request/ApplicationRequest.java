package com.pth.taskbackend.dto.request;

public record ApplicationRequest(
        String fullName,
        String email,
        String phoneNumber,
        String letter,
        String collectionId,
        String jobId
) {
}
