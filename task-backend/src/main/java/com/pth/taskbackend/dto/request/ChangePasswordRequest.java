package com.pth.taskbackend.dto.request;

public record ChangePasswordRequest( String currentPassword, String newPassword) {
}
