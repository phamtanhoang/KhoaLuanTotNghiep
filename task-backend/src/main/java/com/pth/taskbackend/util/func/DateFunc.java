package com.pth.taskbackend.util.func;

import java.time.LocalDateTime;

public class DateFunc {
    public static boolean isExpired(LocalDateTime expiryDate) {
        LocalDateTime today = LocalDateTime.now();
        return expiryDate.isBefore(today);
    }
}
