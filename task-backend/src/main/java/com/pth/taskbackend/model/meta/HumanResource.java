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
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HumanResource extends BaseEntity {

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Lob
    @Column(nullable = false, length = 1000)
    private byte[] avatar;

    @Enumerated(EnumType.STRING)
    private ESex sex;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @Column
    private boolean createJob;
    @Column
    private boolean viewJob;
    @Column
    private boolean editJob;
    @Column
    private boolean deleteJob;

    // Các trường và phương thức khác
}

