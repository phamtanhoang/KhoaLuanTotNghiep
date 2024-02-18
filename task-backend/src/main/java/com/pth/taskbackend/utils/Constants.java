package com.pth.taskbackend.utils;

public class Constants {
    public static final String LOCALHOST = "localhost";
    public static final String DEFAULT_PATH = "/";
    public static final boolean HTTP_ONLY = true;
    public static final String API_VERSION = "/v1";
    public static final String BASE_URL = "http://localhost:8080" + API_VERSION;

    public static class Tokens {
        public static final String APP_ACCESS_TOKEN = "app_access_token";
        public static final String APP_REFRESH_TOKEN = "app_refresh_token";
        public static final String ACCESS_TOKEN_TYPE = "access_token";
        public static final String REFRESH_TOKEN_TYPE = "refresh_token";
        public static final String ROLES = "roles";

        public static final String JWT_TOKEN_TYPE = "type";
    }

    public static class Paths {
        public static final String AUTH_PATH = BASE_URL + "/auth";
        public static final String RESOURCE_PATH = BASE_URL + "/resource";
    }

    public static class Exception {
        public static class InvalidRequestParams {
            public static final String CODE = "000001";
            public static final String CONTENT = "Invalid request params";
        }

        public static class UserNotFound {
            public static final String CODE = "000100";
            public static final String CONTENT = "User not found";
        }

        public static class UserAlreadyExist {
            public static final String CODE = "000101";
            public static final String CONTENT = "User already exists";
        }
    }
}
