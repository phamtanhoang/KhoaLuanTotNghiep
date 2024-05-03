package com.pth.taskbackend.dto.response;

public record JobEmployerResponse( String name,
                                   String id,
                                   String email,
                                   String avatar,
                                   String phoneNumber) {
}
