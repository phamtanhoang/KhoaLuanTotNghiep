package com.pth.taskbackend.model.meta;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetail implements UserDetails {
    private String username;
    private String password;
    private ERole role;
    private boolean accountNonExpired;
    private boolean accountNonLocked;
    private boolean credentialsNonExpired;
    private boolean enabled;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    public static UserDetail of(User user) {
        return new UserDetail(
                user.getEmail(),
                user.getPassword(),
                user.getRole(),
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
