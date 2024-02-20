package com.pth.taskbackend.utils.constants;

public class PathConstants {
    public static final String LOCALHOST = "localhost";
    public static final String DEFAULT_PATH = "/";
    public static final boolean HTTP_ONLY = true;
    public static final String API_VERSION = "/v1";
    public static final String BASE_URL = "http://localhost:8080" + API_VERSION;

    public static class AuthPaths {
        //            public static final String AUTH_PATH = BASE_URL + "/auth";
//            public static final String AUTH_LOGIN_PATH = AUTH_PATH + "/login";
//            public static final String AUTH_REFRESH_PATH = AUTH_PATH + "/refresh";
        public static final String AUTH_PATH = "/auth";
        public static final String AUTH_LOGIN_PATH = "/login";
        public static final String AUTH_REFRESH_PATH = "/refresh";
    }

    public static class ResourcePaths {
        public static final String RESOURCE_PATH = "/resource";
    }

}
