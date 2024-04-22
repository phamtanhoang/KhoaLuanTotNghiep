package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.VipEmployer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface VipEmployerRepository extends JpaRepository<VipEmployer, String> {
    @Query("SELECT CASE WHEN COUNT(v) > 0 THEN true ELSE false END FROM VipEmployer v WHERE v.employer.id = :employerId AND v.toDate > CURRENT_DATE()")
    boolean isVip(@Param("employerId") String employerId);
    @Query("SELECT e FROM VipEmployer e where e.vip.id = :vipId")
    List<VipEmployer> findByVipIdWithList(String vipId);
    @Query("SELECT e FROM VipEmployer e JOIN Employer em on  e.employer.id = em.id where em.name = :name")
    Page<VipEmployer> findByEmployerNameContaining(String name, Pageable pageable);

    Optional<VipEmployer> findByIdAndEmployerId(String id, String employerId);

    Page<VipEmployer>findByVipId(String vipId, Pageable pageable);

    @Query("SELECT v FROM VipEmployer v WHERE v.employer.id = :employerId ")

    Page<VipEmployer>findByEmployerId(String employerId, Pageable pageable);

    @Query("SELECT v FROM VipEmployer v WHERE v.employer.id = :employerId AND DATE(v.toDate) >= CURRENT_DATE() AND v.toDate = (SELECT MAX(e.toDate) FROM VipEmployer e WHERE e.employer.id = :employerId)")
    Optional<VipEmployer> findLatestByEmployerId(@Param("employerId") String employerId);

    @Query("SELECT COALESCE(SUM(e.price), 0) FROM VipEmployer e ")
    float sumPrice();

    @Query("SELECT COUNT(v) FROM VipEmployer v " +
            "WHERE v.id IN (" +
            "   SELECT MAX(v2.id) FROM VipEmployer v2 " +
            "   WHERE v2.employer = v.employer AND v2.toDate > CURRENT_DATE()" +
            "   GROUP BY v2.employer" +
            ")")
    Long countValidVipEmployers();
}
