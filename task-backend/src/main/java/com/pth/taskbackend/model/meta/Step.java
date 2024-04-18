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

    private String name;
    private int number;
    @ManyToOne
    @JoinColumn(name = "process_id")
    private Process process;

}

