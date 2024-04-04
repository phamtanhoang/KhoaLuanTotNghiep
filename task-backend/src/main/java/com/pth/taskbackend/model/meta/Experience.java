package com.pth.taskbackend.model.meta;


import jakarta.persistence.*;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;


@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Experience extends BaseEntity  {
    @Column(nullable = false)
    private String experience;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column
    private LocalDateTime fromDate;

    @Column
    private LocalDateTime toDate;

    @OneToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
}

