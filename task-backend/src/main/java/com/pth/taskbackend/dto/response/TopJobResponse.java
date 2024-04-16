package com.pth.taskbackend.dto.response;

public record TopJobResponse(String id, String name,String employerId, String employerName, String image,Long count) {
}
