package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
    @Query("SELECT u FROM User u JOIN Candidate c On u.id = c.user.id " +
    " where c.id =:id ")
    Optional<User> findByCandidateId(String id);
    @Query("SELECT u FROM User u JOIN Employer c ON u.id = c.user.id " +
            " WHERE c.id =:id ")
    Optional<User>findByEmployerId(String id);
    @Query("SELECT u FROM User u JOIN HumanResource hr ON u.id = hr.user.id " +
            " WHERE hr.id =:id ")
    Optional<User>findByHumanResourceId(String id);



}

