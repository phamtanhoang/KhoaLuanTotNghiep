package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;

import java.time.LocalDateTime;

public record CandidateResponse(String id,
                                LocalDateTime created,
                                LocalDateTime updated,
                                String firstName,
                                String lastName,
                                String phoneNumber,
                                ESex sex,
                                String avatar,
                                LocalDateTime dateOfBirth,
                                String introduction,
                                String job,
                                String link,

                                Boolean isFindJob,
                                EStatus status,
                                String email,
                                String userId) {
}
