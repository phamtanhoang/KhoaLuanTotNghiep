package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.HumanResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, String> {
    @Query("SELECT e FROM Employer e JOIN e.user u WHERE (:keyword IS NULL OR e.name LIKE %:keyword%) OR (:keyword IS NULL OR u.email LIKE %:keyword%)")
    Page<Employer> findByKeyword(String keyword, Pageable pageable);
    Optional<Employer> findByUserEmail(String email);

    @Query("SELECT e, COUNT(j.id) as count " +
            "FROM Employer e " +
            "LEFT JOIN HumanResource hr ON e.id = hr.employer.id " +
            "LEFT JOIN Job j ON j.humanResource.id = hr.id " +
            "GROUP BY e " +
            "HAVING COUNT(j.id) > 0 " +
            "ORDER BY count DESC")
    Page<Object[]> findEmployerByJobCount(Pageable pageable);
}
