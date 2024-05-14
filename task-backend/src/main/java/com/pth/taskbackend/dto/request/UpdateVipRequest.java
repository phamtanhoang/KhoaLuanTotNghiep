package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.EVipStatus;

public record UpdateVipRequest(String name, String color, int month, long price, EVipStatus status, String description) {
}
