package com.pth.taskbackend.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum EStatus {
    ACTIVE("ACTIVE"),
    PENDING("PENDING"),
    INACTIVE("INACTIVE"),
    DELETED("DELETED");

    private final String status;

    EStatus(String status) {
        this.status = status;
    }

    @JsonCreator
    public static EStatus fromString(String text) {
        for (EStatus status : EStatus.values()) {
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
