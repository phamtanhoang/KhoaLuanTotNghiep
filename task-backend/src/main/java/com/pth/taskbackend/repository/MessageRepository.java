package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, String> {
    Page<Message>findByApplicationId(String id, Pageable pageable);
}
