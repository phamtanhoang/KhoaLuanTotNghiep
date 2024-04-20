    package com.pth.taskbackend.model.meta;

    import com.pth.taskbackend.model.BaseEntity;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.EqualsAndHashCode;
    import lombok.NoArgsConstructor;

    import java.util.HashSet;
    import java.util.Set;

    @Entity
    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Process extends BaseEntity {
        @Column(nullable = false)
        private String name;

        @Column
        private String description;

        @ManyToOne
        @JoinColumn(name = "employer_id")
        private Employer employer;


    }
