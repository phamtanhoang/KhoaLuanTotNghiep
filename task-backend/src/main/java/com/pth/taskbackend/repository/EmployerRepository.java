package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.HumanResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployerRepository extends JpaRepository<Employer, String> {
    @Query("SELECT e FROM Employer e JOIN e.user u WHERE (:keyword IS NULL OR e.name LIKE %:keyword%) OR (:keyword IS NULL OR u.email LIKE %:keyword%)")
    Page<Employer> findByKeyword(String keyword, Pageable pageable);

}
