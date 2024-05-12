package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.StepSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface StepScheduleRepository extends JpaRepository<StepSchedule,String> {

    @Query("SELECT s FROM StepSchedule s WHERE s.application.id = :id AND s.stepNumber = :number")
    Optional<StepSchedule> findByApplicationIdAndStepNumber(String id, int number);

    List<StepSchedule> findAllByApplicationId(String id);

    @Query("SELECT ss" +
            " FROM StepSchedule ss" +
            " JOIN ss.application app" +
            " WHERE app.candidate.id = :id")
    List<StepSchedule> getDataScheduleByCandidateId(String id);

    @Query("SELECT ss" +
            " FROM StepSchedule ss" +
            " JOIN ss.application app" +
            " JOIN app.job j" +
            " WHERE j.humanResource.id = :id")
//            " AND ((ss.startDate <= :fromDateTime AND :fromDateTime <= ss.endDate) OR" +
//            " (ss.startDate <= :toDateTime AND :toDateTime <= ss.endDate) OR" +
//            " (:toDateTime <= ss.startDate AND ss.endDate <= :toDateTime) OR" +
//            " (:fromDateTime <= :ss.startDate AND ss.endDate <= fromDateTime))")
    List<StepSchedule> getDataScheduleByHRId(String id);

    @Query("SELECT ss" +
            " FROM StepSchedule ss" +
            " JOIN ss.application app" +
            " JOIN app.job j" +
            " JOIN j.humanResource h" +
            " WHERE h.employer.id = :id")
    List<StepSchedule> getDataScheduleByEmployerId(String id);

}
