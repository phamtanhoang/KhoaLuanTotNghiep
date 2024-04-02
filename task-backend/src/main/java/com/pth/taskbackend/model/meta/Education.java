package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
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
public class Education  extends BaseEntity  {

    @Column(nullable = false)
    private String education;

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

