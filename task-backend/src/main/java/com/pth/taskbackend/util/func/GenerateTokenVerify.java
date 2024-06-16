package com.pth.taskbackend.util.func;

import java.util.Random;

public class GenerateTokenVerify {
    public static String generateToken(int length) {
        Random random = new Random();
        StringBuilder token = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            token.append(random.nextInt(10));
        }
        return token.toString();
    }
}
