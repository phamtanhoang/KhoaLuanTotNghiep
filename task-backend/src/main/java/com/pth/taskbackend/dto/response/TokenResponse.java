package com.pth.taskbackend.dto.response;

import java.util.Optional;

public record TokenResponse (String accessToken, String refreshToken){
}