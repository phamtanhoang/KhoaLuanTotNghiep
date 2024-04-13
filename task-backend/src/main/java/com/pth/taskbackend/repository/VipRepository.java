package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EType;
import com.pth.taskbackend.enums.EVipStatus;
import com.pth.taskbackend.model.meta.Vip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VipRepository extends JpaRepository<Vip,String> {
    @Query("SELECT v FROM Vip v WHERE " +
            "(:type IS NULL OR v.type = :type) AND " +
            "(:status IS NULL OR v.status = :status)")
    Page<Vip> findByStatusAndType(@Param("type") EType type, @Param("status") EVipStatus status, Pageable pageable);

}
