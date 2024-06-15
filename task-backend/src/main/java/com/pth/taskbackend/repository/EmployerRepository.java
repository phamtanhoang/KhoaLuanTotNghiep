package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.HumanResource;
import com.pth.taskbackend.model.meta.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, String> {
    @Query("SELECT e FROM Employer e JOIN e.user u WHERE (:keyword IS NULL OR e.name LIKE %:keyword%) OR (:keyword IS NULL OR u.email LIKE %:keyword%)")
    Page<Employer> findByKeyword(String keyword, Pageable pageable);
    Optional<Employer> findByUserEmail(String email);

    Optional<Employer>findByIdAndUserStatus(String id, EStatus status);
    @Query("SELECT e FROM Employer e, User u " +
            "WHERE (e.user = u) " + // Điều kiện để nối hai bảng
            "AND (:keyword IS NULL OR e.name LIKE %:keyword% OR u.email LIKE %:keyword%) " +
            "AND (:status IS NULL OR u.status = :status) " +
            "AND u.status <> 'DELETED'")
    Page<Employer> findByKeywordAndUserStatus(String keyword, EStatus status, Pageable pageable);


    @Query("SELECT e, COUNT(j.id) as count " +
            "FROM Employer e " +
            "LEFT JOIN HumanResource hr ON e.id = hr.employer.id " +
            "LEFT JOIN Job j ON j.humanResource.id = hr.id " +
            "GROUP BY e " +
            "HAVING COUNT(j.id) > 0 " +
            "ORDER BY count DESC")
    Page<Object[]> findEmployerByJobCount(Pageable pageable);

    @Query("SELECT distinct e FROM Employer e " +
            "JOIN  User a on e.user.id=a.id "+
            "JOIN VipEmployer v ON e.id = v.employer.id " +
            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()" +
            "And a.status='ACTIVE'" +
            " order by RAND()")
    Page<Employer> findVipEmployers(Pageable pageable);

    @Query("SELECT e FROM Employer e " +
            "JOIN  User u on e.user.id=u.id "+
            "WHERE u.status = 'PENDING' " +
            "ORDER BY e.created DESC")
    Page<Employer> findPendingEmployer_ADMIN(Pageable pageable);

    @Query("SELECT COUNT(e) FROM Employer e WHERE e.user.status != 'DELETED'")
    Integer countEmployer_Admin();
    @Query("SELECT COUNT(e) e FROM Employer e " +
            "JOIN  User a on e.user.id=a.id "+
            "JOIN VipEmployer v ON e.id = v.employer.id " +
            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()" +
            "And a.status!='DELETED'")
    Integer countEmployerVip_Admin();

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM followed_employer WHERE employer_id = :employerId and candidate_id = :candidateId ", nativeQuery = true)
    void unfollowEmployer(String candidateId, String employerId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO followed_employer(candidate_id, employer_id) VALUES (:candidateId, :employerId)", nativeQuery = true)
    void followEmployer(String candidateId, String employerId);

    @Query("SELECT COUNT(e) > 0 FROM Employer e INNER JOIN e.candidates c WHERE c.id = :candidateId and e.id = :employerId")
    boolean checkIsFollowEmployer(String candidateId, String employerId);

    @Query("SELECT e FROM Employer e INNER JOIN e.candidates c " +
            "WHERE (:id IS NULL OR c.id = :id) " +
            "AND c.user.status='ACTIVE'")
    Page<Employer> getEmployersFollowed(String id, Pageable pageable);

    @Query("SELECT c FROM Employer c INNER JOIN c.followedCandidates e " +
            "WHERE (:id IS NULL OR e.id = :id) " +
            "AND e.user.status='ACTIVE'")
    List<Employer> getEmployersSavedMe(String id);
}
