package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Step;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Repository;

@Repository
public interface StepRepository extends JpaRepository<Step,String> {
    Page<Step> findByProcessIdOrderByNumberAsc(String processId, Pageable pageable);
    Optional<Step>findByProcessIdAndNumber(String processId,int number);
    Long countAllByProcessId(String processId);

    List<Step> findByProcessId(String processId);
}
