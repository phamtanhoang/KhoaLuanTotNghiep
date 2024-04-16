package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Tag;

import java.time.LocalDateTime;
import java.util.List;

public record JobResponse (
        String id,
        LocalDateTime created,
        LocalDateTime updated,
        LocalDateTime toDate,
        String name,
        String description,
        String experience,
        String fromSalary,
        String toSalary,
        String location,
        EStatus status,
        String categoryId,
        String categoryName,
        String hrId,
        String hrName,
        String employerName,
        String employerId,
        String employerEmail,
        String processId,
        String processName,
        List<StepResponse>steps,
        List<Tag>tags){
}
