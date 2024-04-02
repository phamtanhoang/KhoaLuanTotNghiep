package com.pth.taskbackend.model.meta;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String experience;

    private String description;

    @Column(nullable = false)
    private LocalDateTime fromDate;

    private LocalDateTime toDate;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

}
