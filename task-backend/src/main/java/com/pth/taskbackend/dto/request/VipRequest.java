package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.enums.EType;

public record VipRequest(String name, int month, Long price, String color, String description) {
}
