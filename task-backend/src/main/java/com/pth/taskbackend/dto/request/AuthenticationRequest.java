package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.ERole;

public record AuthenticationRequest(String username, String password, ERole role) {
}
