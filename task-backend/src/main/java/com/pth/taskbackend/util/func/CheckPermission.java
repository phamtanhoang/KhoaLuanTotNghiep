package com.pth.taskbackend.util.func;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import com.pth.taskbackend.security.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class CheckPermission {
@Autowired
    JwtService jwtService;

    public boolean hasPermission(String token, EStatus status, ERole role) {
        // Giải mã token để truy xuất claims
        Jws<Claims> claims = jwtService.extractClaim(token);

        // Kiểm tra xem token có hợp lệ không
        if (claims != null) {
            // Truy xuất các claims từ token
            Claims body = claims.getBody();

            // Kiểm tra quyền hạn
            List<String> roles = body.get("roles", List.class);
            if (roles != null && roles.contains(role.toString())) {
                // Kiểm tra trạng thái
                String statusClaim = body.get("status", String.class);
                if (statusClaim != null && statusClaim.equals(status.toString())) {
                    // Người dùng có quyền và trạng thái phù hợp
                    return true;
                }
            }
        }

        // Người dùng không có quyền hoặc token không hợp lệ
        return false;
    }
