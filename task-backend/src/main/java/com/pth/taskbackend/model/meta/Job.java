package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.ERole;
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
public class Job extends BaseEntity {


    @Column(nullable = false)
    private String name;

    private String description;

    private LocalDateTime toDate;

    @Column(nullable = false)
    private String address;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    @Column
    private String fromSalary;
    @Column
    private String toSalary;
    @Column
    private String experience;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "human_resource_id")
    private HumanResource humanResource;
}

