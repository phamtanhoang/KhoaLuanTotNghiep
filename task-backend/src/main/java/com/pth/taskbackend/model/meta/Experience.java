package com.pth.taskbackend.model.meta;

<<<<<<< HEAD
import jakarta.persistence.*;
=======
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

<<<<<<< HEAD

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
=======
@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Experience extends BaseEntity  {
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d

    @Column(nullable = false)
    private String experience;

<<<<<<< HEAD
    private String description;

    @Column(nullable = false)
    private LocalDateTime fromDate;

    private LocalDateTime toDate;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;

}
=======
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
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d
