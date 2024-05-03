package com.pth.taskbackend.dto.response;

public record JobEmployerResponse( String employerName,
                                   String employerId,
                                   String employerEmail,
                                   String employerAvatar,
                                   String employerPhoneNumber) {
}
