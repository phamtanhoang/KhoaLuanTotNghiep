package com.pth.taskbackend.repository;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.Candidate;
import com.pth.taskbackend.model.meta.Employer;
import com.pth.taskbackend.model.meta.HumanResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, String> {
    @Query("SELECT c FROM Candidate c, User u " +
            "WHERE (c.user = u) " +
            "AND (:keyword IS NULL OR c.firstName LIKE %:keyword% OR u.email LIKE %:keyword% OR c.lastName LIKE %:keyword%) " +
            "AND (:status IS NULL OR u.status = :status) " +
            "AND u.status <> 'DELETED'")
    Page<Candidate> findByKeywordAndUserStatus(String keyword, EStatus status, Pageable pageable);

//    @Query("SELECT DISTINCT c " +
//            "FROM Candidate c " +
//            "JOIN User a ON c.user.id = a.id " +
//            "JOIN VipCandidate v ON c.id = v.candidate.id " +
//            "JOIN c.skills s " +
//            "WHERE (DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()) " +
//            "AND a.status = 'ACTIVE' " +
//            "AND a.status != 'DELETE' " +
//            "AND (:keyword IS NULL OR " +
//            "     LOWER(c.job) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
//            "     OR LOWER(s.skill) LIKE LOWER(CONCAT('%', :keyword, '%'))) ")
//    Page<Candidate> findVipCandidateByKeyword(@Param("keyword") String keyword, Pageable pageable);

    @Query(value = "SELECT DISTINCT c.* " +
            "FROM candidate c " +
            "JOIN user u ON c.user_id = u.id " +
            "JOIN skill s ON c.id = s.candidate_id " +
            "WHERE c.is_find_job = true " +
            "AND u.status = 'ACTIVE' " +
            "AND LOWER(c.job) LIKE LOWER(CONCAT('%', :job, '%')) " +
            "AND LOWER(c.address) LIKE LOWER(CONCAT('%', :address, '%')) " +
            "AND LOWER(s.skill) LIKE LOWER(CONCAT('%', :skill, '%')) " +
            "ORDER BY RAND()",
            countQuery = "SELECT COUNT(DISTINCT c.id) " +
                    "FROM candidate c " +
                    "JOIN user u ON c.user_id = u.id " +
                    "JOIN skill s ON c.id = s.candidate_id " +
                    "WHERE c.is_find_job = true " +
                    "AND u.status = 'ACTIVE' " +
                    "AND LOWER(c.job) LIKE LOWER(CONCAT('%', :job, '%')) " +
                    "AND LOWER(c.address) LIKE LOWER(CONCAT('%', :address, '%')) " +
                    "AND LOWER(s.skill) LIKE LOWER(CONCAT('%', :skill, '%'))",
            nativeQuery = true)
    Page<Candidate> findCV(@Param("job") String job,
                           @Param("address") String address,
                           @Param("skill") String skill,
                           Pageable pageable);

//    @Query(value = "SELECT DISTINCT c.* " +
//            "FROM candidate c " +
//            "JOIN skill s ON c.id = s.candidate_id " +
//            "WHERE LOWER(s.skill) LIKE LOWER(CONCAT('%', :skill, '%'))",
//            nativeQuery = true)

    Optional<Candidate>findByUserEmail(String email);
//    @Query("SELECT distinct c FROM Candidate c " +
//            "JOIN  User a on c.user.id=a.id "+
//            "JOIN VipCandidate v ON c.id = v.candidate.id " +
//            "WHERE DATE(v.fromDate) <= CURRENT_DATE() AND DATE(v.toDate) >= CURRENT_DATE()" +
//            "And a.status='ACTIVE'")
//    Page<Candidate> findVipCandidates(Pageable pageable);

    @Query("SELECT COUNT(c) FROM Candidate c WHERE c.user.status != 'DELETED'")
    Integer countCandidate_Admin();

    @Query("SELECT j FROM Candidate j INNER JOIN j.employers c " +
            "WHERE (:id IS NULL OR c.id = :id) ")
    Page<Candidate> getCandidatesFollow(String id, Pageable pageable);
    @Query("SELECT c FROM Candidate c INNER JOIN c.employers e " +
            "WHERE (:id IS NULL OR e.id = :id) " +
            "AND e.user.status='ACTIVE'")
    List<Candidate> getCandidatesFollow(String id);

    @Query("SELECT COUNT(e) > 0 FROM Candidate e INNER JOIN e.followedByEmployers c WHERE c.id = :employerId and e.id = :candidateId")
    boolean checkIsFollow_Employer_Candidate(String employerId, String candidateId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO employer_candidate_follow(employer_id, candidate_id) VALUES (:employerId, :candidateId)", nativeQuery = true)
    void follow_Employer_Candidate(String employerId, String candidateId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM employer_candidate_follow WHERE employer_id = :employerId and candidate_id = :candidateId ", nativeQuery = true)
    void unfollow_Employer_Candidate(String employerId, String candidateId);

    @Query("SELECT j FROM Candidate j INNER JOIN j.followedByEmployers c " +
            "WHERE (:id IS NULL OR c.id = :id) AND j.user.status = 'ACTIVE'")
    Page<Candidate> getCandidatesSaved_Employer(String id, Pageable pageable);

    @Query("SELECT COUNT(e) > 0 FROM Candidate e INNER JOIN e.followedByHRs c WHERE c.id = :hrId and e.id = :candidateId")
    boolean checkIsFollow_HR_Candidate(String hrId, String candidateId);

    @Transactional
    @Modifying
    @Query(value = "INSERT INTO hr_candidate_follow(hr_id, candidate_id) VALUES (:hrId, :candidateId)", nativeQuery = true)
    void follow_HR_Candidate(String hrId, String candidateId);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM hr_candidate_follow WHERE hr_id = :hrId and candidate_id = :candidateId ", nativeQuery = true)
    void unfollow_HR_Candidate(String hrId, String candidateId);

    @Query("SELECT j FROM Candidate j INNER JOIN j.followedByHRs c " +
            "WHERE (:id IS NULL OR c.id = :id) AND j.user.status = 'ACTIVE'")
    Page<Candidate> getCandidatesSaved_HR(String id, Pageable pageable);

}
