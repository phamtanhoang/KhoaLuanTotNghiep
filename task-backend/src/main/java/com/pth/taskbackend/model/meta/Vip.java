package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.*;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vip extends BaseEntity {

    @Column(nullable = false,unique = true)
    private String name;

    @Column(nullable = false)
    private Long price;

    @Enumerated(EnumType.STRING)
    private EType type;
    @Column(nullable = false)
    private String color;

    @Column(nullable = false)
    private int month;

    @Enumerated(EnumType.STRING)
    private EVipStatus status;


}

