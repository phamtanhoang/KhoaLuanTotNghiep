package com.pth.taskbackend.dto.response;

public record JobApplicationResponse(
        String id, String name, String fromSalary, String toSalary,String location, CategoryApplicationResponse category
) {
}
