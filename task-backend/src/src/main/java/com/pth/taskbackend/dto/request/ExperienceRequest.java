package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.model.meta.Experience;
import com.pth.taskbackend.model.meta.Skill;

import java.util.List;

public record ExperienceRequest(List<Experience> experiences) {
}
