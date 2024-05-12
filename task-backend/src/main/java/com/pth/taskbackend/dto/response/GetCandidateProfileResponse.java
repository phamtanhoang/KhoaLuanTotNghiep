package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.ESex;

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
    String avatar,
    ESex sex,
    Boolean isFindJob,
    String cV
){
}
