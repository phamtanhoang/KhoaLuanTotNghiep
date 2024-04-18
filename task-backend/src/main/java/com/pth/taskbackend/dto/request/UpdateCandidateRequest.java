package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.ESex;

import java.time.LocalDateTime;

public record UpdateCandidateRequest (String id,
                                      String firstName,
                                      String lastName,
                                      String address,
                                      String phoneNumber,
                                      LocalDateTime dateOfBirth,
                                      String link,
                                      String job,
                                      String introduction,
                                      ESex sex,
                                      String password
){
}
