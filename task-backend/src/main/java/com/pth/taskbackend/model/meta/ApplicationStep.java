package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EStepStatus;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationStep extends BaseEntity {
    @Column(unique = true,nullable = false)
    String name;
    @Column(nullable = false)
    int number;

    @Enumerated(EnumType.STRING)
    private EStepStatus status;

    @Column(columnDefinition = "TEXT")
    String result;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private Application application;
}
