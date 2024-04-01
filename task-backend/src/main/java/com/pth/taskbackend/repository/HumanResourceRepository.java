package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Category;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.service.HumanResourceService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface HumanResourceRepository extends JpaRepository<HumanResource, String> {
    @Query("SELECT hr FROM HumanResource hr WHERE hr.user.id = (SELECT u.id FROM User u WHERE u.email = :email)")
    Optional<HumanResource> findByEmail(String email);
}
