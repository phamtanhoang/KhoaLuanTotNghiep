package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.ESex;

import java.time.LocalDateTime;

public record CreateCandidateRequest
        (String username,
         String password,
         LocalDateTime dateOfBirth,
         String firstName,
         String lastName,
         ESex sex,
         String phoneNumber
        ){

}
