package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.ESex;

import java.time.LocalDateTime;

public record CreateHumanResourceRequest (String username,
                                          String password,
                                          String firstName,
                                          String lastName,
                                          ESex sex,
                                          String phoneNumber,
                                            LocalDateTime dateOfBirth){
}
