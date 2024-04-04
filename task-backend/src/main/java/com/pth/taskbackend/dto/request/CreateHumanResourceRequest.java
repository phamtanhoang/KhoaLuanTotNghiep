package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.ESex;

public record CreateHumanResourceRequest (String username,
                                          String password,
                                          String firstName,
                                          String lastName,
                                          ESex sex,
                                          String phoneNumber){
}
