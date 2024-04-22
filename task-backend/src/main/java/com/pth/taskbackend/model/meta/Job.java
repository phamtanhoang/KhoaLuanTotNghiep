package com.pth.taskbackend.model.meta;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Job  extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column
    private String description;

    @Column
    private LocalDateTime toDate;

    @Column(nullable = false)
    private String location;

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

    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "job_tag",
            joinColumns = @JoinColumn(name = "job_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private Set<Tag> tags = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "process_id")
    private Process process;

}
