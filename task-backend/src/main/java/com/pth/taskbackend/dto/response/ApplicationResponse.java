package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;

import java.time.LocalDateTime;

public record ApplicationResponse (
    String id,
    LocalDateTime applyDate,
    String cV,
    String email,
    String fullName,
    String letter,
    String phoneNumber,
    EApplyStatus status,
    CandidateResponse candidate,
    JobResponse job){
}