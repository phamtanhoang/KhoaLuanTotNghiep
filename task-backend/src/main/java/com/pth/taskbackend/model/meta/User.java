package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime created;

//    @LastModifiedDate
//    private LocalDateTime updated;

    private String email;
    private String password;

    @Enumerated(EnumType.STRING)
    private EStatus status;

    @Enumerated(EnumType.STRING)
    private ERole role;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(
//            name = "user_role",
//            joinColumns = @JoinColumn(name = "user_id"),
//            inverseJoinColumns = @JoinColumn(name = "role_id")
//    )
//    private Set<Role> roles = new HashSet<>();
}
