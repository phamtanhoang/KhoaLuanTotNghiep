package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.Message;
import com.pth.taskbackend.model.meta.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ChatService {
    Message sendMessage(String content, String file, Application application, User user) throws IOException;

    Page<Message> findByApplication(String id, Pageable pageable) throws IOException;
}
