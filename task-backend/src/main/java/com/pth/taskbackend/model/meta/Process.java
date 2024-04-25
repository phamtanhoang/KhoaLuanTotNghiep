    package com.pth.taskbackend.model.meta;

    import com.pth.taskbackend.model.BaseEntity;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Data;
    import lombok.EqualsAndHashCode;
    import lombok.NoArgsConstructor;

    import java.util.HashSet;
    import java.util.List;
    import java.util.Set;

    @Entity
    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public class Process extends BaseEntity {
        @Column(nullable = false)
        private String name;

        @Column(columnDefinition = "TEXT")
        private String description;

        @ManyToOne
        @JoinColumn(name = "employer_id")
        private Employer employer;

        @OneToMany(mappedBy = "process", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Step> steps;

        @Override
        public String toString() {
            return "Process{" +
                    "name='" + name + '\'' +
                    ", description='" + description + '\'' +
                    ", employer=" + employer +
                    '}';
        }

    }
