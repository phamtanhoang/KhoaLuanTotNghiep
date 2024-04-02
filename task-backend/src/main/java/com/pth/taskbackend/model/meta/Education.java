package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
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

    @Column(nullable = false)
    private String education;

    private String description;
    @Column(nullable = false)
    private LocalDateTime fromDate;
    private LocalDateTime toDate;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;



}

