package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.model.meta.Step;

import java.util.Set;

public record ProcessRequest(String id, String name, String description, Set<StepRequest> steps) {
}
