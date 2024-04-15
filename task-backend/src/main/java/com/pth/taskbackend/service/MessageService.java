package com.pth.taskbackend.service;

import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;

public interface MessageService {
    Page<Message>findByApplicationId(String applicationId , Pageable pageable) throws IOException;
    Message create(Message message)throws IOException;
}
