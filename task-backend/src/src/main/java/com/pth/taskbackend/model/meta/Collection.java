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
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Collection extends BaseEntity {

    @Column(nullable = false)
    private String fullName;

    @Column
    private String phoneNumber;

    @Column
    private String email;

    @Column(nullable = false)
    private String cV;

    @Column(columnDefinition = "TEXT")
    private String letter;

    @ManyToOne
    @JoinColumn(name = "candidate_id")
    private Candidate candidate;
}
