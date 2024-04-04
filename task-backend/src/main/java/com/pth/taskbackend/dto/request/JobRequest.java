package com.pth.taskbackend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
public record JobRequest (
     String id,
     String name,
     String description,
     LocalDateTime toDate,
     String location,
     String fromSalary,
     String toSalary,
     String experience,
     String categoryId,
     String humanResourceId
){
}
