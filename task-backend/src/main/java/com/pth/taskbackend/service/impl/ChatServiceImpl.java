package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Application;
import com.pth.taskbackend.model.meta.Message;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.repository.CategoryRepository;
import com.pth.taskbackend.repository.ChatRepository;
import com.pth.taskbackend.service.ChatService;
import com.pth.taskbackend.util.func.FileUploadFunc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ChatServiceImpl implements ChatService {
    @Autowired
    private ChatRepository chatRepository;
    @Override
    public Message sendMessage(String content, String file, Application application, User user) throws IOException {
        Message message = new Message();
        message.setContent(content);
        message.setApplication(application);
        message.setUser(user);
        message.setFile(file);
        chatRepository.save(message);
        return message;
    }

    @Override
    public Page<Message> findByApplication(String id, Pageable pageable) throws IOException {
        return chatRepository.findByApplicationId(id, pageable);
    }
}
