package com.pth.taskbackend.dto.response;

import java.time.LocalDateTime;

public record EmployerProfileResponse(String id,
                                         String email,
                                         String name,
                                         String description,
                                         String location,
                                         String phoneNumber,
                                         String businessCode,
                                         String image,
                                         String backgroundImage,
                                         boolean isVip
                                        ) {
}
