package com.pth.taskbackend.security;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoDetails implements UserDetails {
    private String username;
    private String password;
    private ERole role;
    private EStatus status; // Thêm trường status vào đây
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        System.out.println(role.name());
        return Collections.singleton(new SimpleGrantedAuthority( role.name().toUpperCase()));
    }

    public static UserInfoDetails of(User user) {
        return new UserInfoDetails(
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
                user.getStatus(), // Thêm status vào đây
                true,
                true,
                true,
                EStatus.ACTIVE.equals(user.getStatus())

        );
    }

    public List<String> getRoleNames() {
        return Collections.singletonList(role.name());
    }
}
