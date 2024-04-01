package com.pth.taskbackend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
@Getter
@Setter
public class CreateJobRequest {
    private String name;
    private String description;
    private LocalDateTime toDate;
    private String location;
    private String fromSalary;
    private String toSalary;
    private String experience;
    private String categoryId;

}
