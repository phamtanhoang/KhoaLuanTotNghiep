package com.pth.taskbackend.dto.response;

import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;

import java.time.LocalDateTime;

public record VipResponse (String id,
                           LocalDateTime created,
                           LocalDateTime updated,
                           String color,
                           int month,
                           String name,
                           Long price,
                           EVipStatus status,
                           String description){
}
