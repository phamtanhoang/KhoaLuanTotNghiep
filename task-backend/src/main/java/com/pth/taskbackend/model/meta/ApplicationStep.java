package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    @Column(columnDefinition = "TEXT")
    String result;

    @ManyToOne
    @JoinColumn(name = "application_id")
    private Application application;
}
