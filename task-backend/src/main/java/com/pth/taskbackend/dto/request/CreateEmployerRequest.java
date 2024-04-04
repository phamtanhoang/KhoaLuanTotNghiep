package com.pth.taskbackend.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;

public record CreateEmployerRequest(
        String username,
        String password,
        String name,
        String location,
        String description,
        String phoneNumber,
        String businessCode)
{
}
