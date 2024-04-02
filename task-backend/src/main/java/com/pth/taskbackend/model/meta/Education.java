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
public class Education   {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
=======
import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Education  extends BaseEntity  {
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d

    @Column(nullable = false)
    private String education;

<<<<<<< HEAD
    private String description;
    @Column(nullable = false)
    private LocalDateTime fromDate;
    private LocalDateTime toDate;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;



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
>>>>>>> f1d9545b11868eac25907205071193d97fb0344d
}

