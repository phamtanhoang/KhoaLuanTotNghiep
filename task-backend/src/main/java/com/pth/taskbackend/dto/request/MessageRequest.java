package com.pth.taskbackend.dto.request;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.User;

public record MessageRequest(String content, String file, Application application, User user) {
}
