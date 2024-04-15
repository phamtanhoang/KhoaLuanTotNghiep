package com.pth.taskbackend.service.impl;

import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Message;
import com.pth.taskbackend.repository.MessageRepository;
import com.pth.taskbackend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageRepository messageRepository;
    @Override
    public Page<Message> findByApplicationId(String applicationId, Pageable pageable) throws IOException {
        return  messageRepository.findByApplicationId(applicationId,pageable);
    }

    @Override
    public Message create(Message message) {
        return messageRepository.save(message);
    }

}
