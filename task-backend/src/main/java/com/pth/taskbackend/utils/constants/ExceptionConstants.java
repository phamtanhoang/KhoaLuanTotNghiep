package com.pth.taskbackend.utils.constants;

public class ExceptionConstants {
    public static class InvalidRequestParams {
        public static final String CODE = "400";
        public static final String MESSAGE = "Tham số yêu cầu không hợp lệ";
    }

    public static class UserNotFound {
        public static final String CODE = "404";
        public static final String MESSAGE = "Người dùng không tồn tại";
    }

    public static class UserAlreadyExist {
        public static final String CODE = "409";
        public static final String MESSAGE = "Người dùng đã tồn tại";
    }
}
