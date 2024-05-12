package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.model.meta.StepResult;
import com.pth.taskbackend.model.meta.StepSchedule;

import java.time.LocalDateTime;
import java.util.List;

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
                                        JobResponse job,
                                        List<StepResult> stepResults,
                                        List<StepSchedule> stepSchedules) {
}
