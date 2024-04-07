package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record GetCandidateProfileResponse(
    String id,
    String email,
    String firstName,
    String lastName,
    String address,
    String phoneNumber,
    LocalDateTime dateOfBirth,
    String link,
    String job,
    String introduction,
    byte[] avatar){
}
