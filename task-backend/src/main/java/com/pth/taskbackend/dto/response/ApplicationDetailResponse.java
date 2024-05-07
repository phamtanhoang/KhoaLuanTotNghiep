package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.ESex;

import java.time.LocalDateTime;

public record ApplicationDetailResponse(String id,
                                        LocalDateTime applyDate,
                                        String cV,
                                        int currentStep,
                                        String email,
                                        String fullName,
                                        String letter,
                                        String phoneNumber,
                                        EApplyStatus status,
                                        CandidateResponse candidate,
                                        JobResponse job) {
}
