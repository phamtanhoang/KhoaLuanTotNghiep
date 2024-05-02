package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Data
public class Experience extends BaseEntity  {
    @Column(nullable = false)
    private String experience;


    @Column(nullable = false)
    private int sequence;

    private String fromDate;


    private String toDate;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
}

