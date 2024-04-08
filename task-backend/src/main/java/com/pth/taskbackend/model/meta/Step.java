package com.pth.taskbackend.model.meta;


import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames = {"number", "procedure_id"})
})
public class Step extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int number;

    @ManyToOne
    @JoinColumn(name = "procedure_id")
    private Procedure procedure;
}

