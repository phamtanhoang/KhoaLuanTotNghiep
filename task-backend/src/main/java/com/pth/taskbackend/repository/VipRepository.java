package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.Vip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VipRepository extends JpaRepository<Vip,String> {
    @Query("SELECT v FROM Vip v " +
            "WHERE (:name IS NULL OR LOWER(v.name) LIKE CONCAT('%', :name, '%')) " +
            "AND (:status IS NULL OR v.status = :status) AND " +
            "v.status != 'DELETED'")
    Page<Vip> findByNameContainingAndType(@Param("name") String name, @Param("status") EVipStatus status, Pageable pageable);

}
