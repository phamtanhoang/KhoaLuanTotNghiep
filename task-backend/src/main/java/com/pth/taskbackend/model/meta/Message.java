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
import java.util.Set;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Message extends BaseEntity {

    @Column(nullable = false)
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_candidate_id")
    private Candidate senderCandidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_candidate_id")
    private Candidate receiverCandidate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_hr_id")
    private HumanResource senderHR;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver_hr_id")
    private HumanResource receiverHR;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    private Application application;

}
