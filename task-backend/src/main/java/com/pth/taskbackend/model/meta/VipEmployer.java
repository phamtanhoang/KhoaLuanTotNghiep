package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.ESex;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.enums.EType;
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
public class VipEmployer extends BaseEntity  {

    @Column(nullable = false)
    private LocalDateTime fromDate;

    @Column(nullable = false)
    private LocalDateTime toDate;

    @Column(nullable = false)
    private Long price;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    private Employer employer;

    @ManyToOne
    @JoinColumn(name = "vip_id")
    private Vip vip;

    @Column(nullable = false)
    private String invoiceId;
}

