package com.pth.taskbackend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EApplyStatus {
    PENDING("PENDING"),
    REJECTED("REJECTED"),
    APPROVED("APPROVED"),
    PROCESSING("PROCESSING"),
    DELETED("DELETED");

    private final String status;

    EApplyStatus(String status) {
        this.status = status;
    }

    @JsonCreator
    public static EApplyStatus fromString(String text) {
        for (EApplyStatus status : EApplyStatus.values()) {
            if (status.status.equalsIgnoreCase(text)) {
                return status;
            }
        }
        throw new IllegalArgumentException("No constant with text " + text + " found");
    }

    @JsonValue
    public String getStatus() {
        return this.status;
    }
}
