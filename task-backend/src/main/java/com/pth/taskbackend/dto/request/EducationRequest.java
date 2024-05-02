package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.model.meta.Education;

import java.util.List;

public record EducationRequest(List<Education> educations) {

}
