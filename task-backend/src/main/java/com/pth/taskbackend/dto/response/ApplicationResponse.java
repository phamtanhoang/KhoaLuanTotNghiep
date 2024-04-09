package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.EStatus;

import java.time.LocalDateTime;

public record ApplicationResponse (
    String id,
    String candidateId,
    String email,
    String fullName,
    String avatar,
    LocalDateTime applyDate,
    EApplyStatus state,
    String jobId,
    String title,
    String employerId,
    String employerName,
    String cV){

}