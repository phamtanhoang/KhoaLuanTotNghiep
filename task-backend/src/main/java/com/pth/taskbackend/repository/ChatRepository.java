package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ChatRepository extends JpaRepository<Message, String> {
    @Query("SELECT m FROM Message m WHERE m.application.id = :id ORDER BY m.created ASC")
    Page<Message> findByApplicationId(@Param("id") String id, Pageable pageable);

}
