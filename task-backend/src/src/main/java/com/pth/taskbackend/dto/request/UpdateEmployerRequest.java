package com.pth.taskbackend.dto.request;

public record UpdateEmployerRequest(String id,String name,String description, String location, String businessCode,String phoneNumber) {
}
