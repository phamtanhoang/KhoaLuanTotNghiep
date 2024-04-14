package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.ESex;

import java.time.LocalDateTime;

public record HumanResourceResponse (String id,
                                    LocalDateTime created,
                                    LocalDateTime updated,
                                    LocalDateTime dateOfBirth,
                                    String firstName,
                                    String lastName,
                                    String phoneNumber,
                                    ESex sex,
                                    String avatar,
                                    String employerName,
                                    String employerId,
                                    String userId,
                                    String status,
                                    String email
                                    ){
}
