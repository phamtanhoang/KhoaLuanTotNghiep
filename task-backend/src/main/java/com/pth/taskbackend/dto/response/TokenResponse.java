package com.pth.taskbackend.dto.response;

import java.util.Optional;

public record TokenResponse (Optional<String> accessToken, Optional<String> refreshToken){
}