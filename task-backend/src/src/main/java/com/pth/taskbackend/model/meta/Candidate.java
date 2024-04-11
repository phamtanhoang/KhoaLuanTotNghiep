package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
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
public class Candidate extends BaseEntity {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private LocalDateTime dateOfBirth;

    @Column(nullable = false,length = 1000)
    private String avatar;

    @Enumerated(EnumType.STRING)
    private ESex sex;


    @Column
    private String address;

    @Column
    private String phoneNumber;

    @Column
    private String link;

    @Column
    private String job;

    @Column(columnDefinition = "TEXT")
    private String introduction;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;
}

