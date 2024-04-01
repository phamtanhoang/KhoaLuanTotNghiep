package com.pth.taskbackend.config;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.model.meta.User;
import com.pth.taskbackend.security.UserInfoDetails;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.List;

@Component
public class PermissionEvaluatorConfig implements PermissionEvaluator {

    @Override
    public boolean hasPermission(Authentication authentication, Object targetDomainObject, Object permission) {
        if (authentication == null || !authentication.isAuthenticated()) {
            return false;
        }

        UserInfoDetails user = (UserInfoDetails) authentication.getPrincipal();

        if ("ACTIVE".equals(permission)) {
            return user.getStatus() == EStatus.ACTIVE;
        }

        return false;
    }

    @Override
    public boolean hasPermission(Authentication authentication, Serializable targetId, String targetType, Object permission) {
        return false;
    }

    public boolean hasAnyRole(UserInfoDetails user, List<ERole> roles) {
        for (ERole role : roles) {
            if (user.getRoleNames().contains(role)) {
                return true;
            }
        }
        return false;
    }
}
