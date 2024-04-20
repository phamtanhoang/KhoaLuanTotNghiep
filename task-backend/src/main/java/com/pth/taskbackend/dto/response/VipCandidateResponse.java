package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;

import java.time.LocalDateTime;
import java.util.List;

public record VipCandidateResponse (String userId, LocalDateTime created, LocalDateTime updated, String email, EStatus status, ERole role, String firstName, String lastName, String avatar, String address, LocalDateTime dateOfBirth, String introduction, String job, String link, String phoneNumber, ESex sex){
}
