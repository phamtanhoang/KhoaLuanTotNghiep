package com.pth.taskbackend.repository;

import com.pth.taskbackend.model.meta.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule,String> {


//    @Query("SELECT s FROM StepSchedule s WHERE s.application.id = :id AND s.stepNumber = :number")
//    Optional<Schedule> findByApplicationIdAndStepNumber(String id, int number);
//
    @Query("SELECT s FROM Schedule s WHERE s.application.id = :id ORDER BY s.startDate ASC")
    List<Schedule> findAllByApplicationId(String id);

    @Query("SELECT s" +
            " FROM Schedule s" +
            " JOIN s.application app" +
            " WHERE app.candidate.id = :id")
    List<Schedule> getDataScheduleByCandidateId(String id);

    @Query("SELECT s" +
            " FROM Schedule s" +
            " JOIN s.application app" +
            " JOIN app.job j" +
            " WHERE j.humanResource.id = :id")
    List<Schedule> getDataScheduleByHRId(String id);

    @Query("SELECT s" +
            " FROM Schedule s" +
            " JOIN s.application app" +
            " JOIN app.job j" +
            " JOIN j.humanResource h" +
            " WHERE h.employer.id = :id")
    List<Schedule> getDataScheduleByEmployerId(String id);

}
