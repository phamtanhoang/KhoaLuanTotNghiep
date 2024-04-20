package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.model.meta.Tag;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

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
         String humanResourceId,
         String processId,
         String hrId,
         Set<Tag> tags

){
}
