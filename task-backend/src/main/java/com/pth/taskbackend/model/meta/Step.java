package com.pth.taskbackend.model.meta;


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
@Table(uniqueConstraints={
        @UniqueConstraint(columnNames = {"number", "process_id"})
})
public class Step extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int number;

    @ManyToOne
    @JoinColumn(name = "process_id")
    private Process process;
}

