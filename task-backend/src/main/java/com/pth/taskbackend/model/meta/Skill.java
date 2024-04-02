package com.pth.taskbackend.model.meta;

<<<<<<< HEAD
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;
=======
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
<<<<<<< HEAD
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill   {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
=======

@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Skill extends BaseEntity  {
<<<<<<< HEAD
=======
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d

>>>>>>> d91e152a1f5c8ae2217ddb4a0142dfba44c74bdd
    @Column(nullable = false)
    private String skill;

<<<<<<< HEAD
    private String description;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;



=======
    @Column(columnDefinition = "TEXT")
    private String description;

    @OneToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d
}

