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

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HumanResource extends BaseEntity {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String avatar;

    @Enumerated(EnumType.STRING)
    private ESex sex;

    LocalDateTime dateOfBirth;

    String phoneNumber;
    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

}

