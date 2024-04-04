package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Skill extends BaseEntity  {

    @Column(nullable = false)
    private String skill;


    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
}

