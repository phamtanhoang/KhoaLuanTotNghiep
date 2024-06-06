package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;

import java.time.LocalDateTime;

public record CandidateDetailResponse(String id,
                                      String firstName,
                                      String lastName,
                                      String phoneNumber,
                                      ESex sex,
                                      String avatar,
                                      LocalDateTime dateOfBirth,
                                      String introduction,
                                      String job,
                                      String link,
                                      String email,
                                      String userId,
                                      String address,
                                      Object extra) {
}
