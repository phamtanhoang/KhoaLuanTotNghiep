package com.pth.taskbackend.dto.request;

public record ChangePasswordRequest(String id, String currentPassword, String newPassword) {
}
