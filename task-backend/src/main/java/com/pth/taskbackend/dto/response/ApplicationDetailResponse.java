package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.model.meta.Schedule;

import java.time.LocalDateTime;
import java.util.List;

public record ApplicationDetailResponse(String id,
                                        LocalDateTime applyDate,
                                        String cV,
                                        String email,
                                        String fullName,
                                        String letter,
                                        String phoneNumber,
                                        EApplyStatus status,
                                        CandidateResponse candidate,
                                        JobResponse job,
                                        List<Schedule> schedules) {
}
