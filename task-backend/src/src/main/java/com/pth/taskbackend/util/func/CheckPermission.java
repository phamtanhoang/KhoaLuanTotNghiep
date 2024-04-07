package com.pth.taskbackend.util.func;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.security.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CheckPermission {
    private  final JwtService jwtService= new JwtService();

    public boolean hasPermission(String token, EStatus status, ERole role) {
        token = token.substring(7);
        Jws<Claims> claimsJws = jwtService.extractClaim(token);
        Claims claims = claimsJws.getBody();

        ERole userRole = ERole.valueOf(claims.get("role", String.class));
        EStatus userStatus = EStatus.valueOf(claims.get("status", String.class));

        return userRole == role && userStatus == status;
    }

}