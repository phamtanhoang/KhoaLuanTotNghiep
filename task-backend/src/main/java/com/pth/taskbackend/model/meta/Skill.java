package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill   {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(nullable = false)
    private String skill;


    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;



    @Column(columnDefinition = "TEXT")
    private String description;

}

