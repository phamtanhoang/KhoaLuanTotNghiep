package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record SkillResponse(String id, LocalDateTime created,LocalDateTime updated, String skill, int sequence,String description,String candidateId) {
}
