package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EApplyStatus;
import com.pth.taskbackend.enums.ESex;

import java.time.LocalDateTime;

public record ApplicationDetailResponse(String jobName,
                                        String email,
                                        String fullName,
                                        String avatar,
                                        LocalDateTime dateOfBirth,
                                        ESex sex,
                                        LocalDateTime applyDate,
                                        String CV,
                                        String letter,
                                        EApplyStatus state) {
}
