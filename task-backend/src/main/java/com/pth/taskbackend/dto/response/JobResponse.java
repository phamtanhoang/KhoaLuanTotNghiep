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
        boolean isVip,
        boolean isSave,
        boolean isTimeUp,
        JobCategoryResponse category,
        JobEmployerResponse employer,
        JobHrResponse humanResource,
        JobProcessResponse process,
        List<Tag>tags){
}
