package com.pth.taskbackend.security;

import com.google.api.client.util.Value;
import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.function.Function;

@Component
public class JwtService {

    public static final String SECRET = "Lu4byRqrMCp6OmPf3zyRUphe1NP0MZrZaB+2Kzay5OBb1Mfs6atzgSfwFCNVxpXhtQP5ToIzK1x1PgCFCpFY0Q==";
    public static  int REFRESH_TOKEN_EXPIRATION_SECONDS = 30 ;
    public static  int ACCESS_TOKEN_EXPIRATION_SECONDS =60;
    private List<String> validTokens = new ArrayList<>();
    public String generateToken(String username, EStatus status, ERole role) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, status,role);
    }

    private String createToken(Map<String, Object> claims, String username,EStatus status,ERole role) {
        System.out.println(ACCESS_TOKEN_EXPIRATION_SECONDS);
        Instant now = Instant.now();
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .claim("status",status)
                .claim("role",role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(Date.from(now.plus(ACCESS_TOKEN_EXPIRATION_SECONDS, ChronoUnit.SECONDS)))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
        validTokens.add(token);
        return token;


    }

    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        try {
            return extractClaim(token, Claims::getSubject);
        } catch (ExpiredJwtException ex) {
            System.out.println("JWT đã hết hạn khi cố gắng trích xuất tên người dùng từ JWT!");
            return null;
        }
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    public Jws<Claims> extractClaim(String token) {
        return Jwts.parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token);
    }
    public Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public boolean isTokenValid(String token) {
        return validTokens.contains(token);
    }

    public void invalidateToken(String token) {
        validTokens.remove(token);
    }
    public Boolean validateToken(String token) {
        return  !isTokenExpired(token);
    }

    public String generateRefreshToken(String username) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plus(REFRESH_TOKEN_EXPIRATION_SECONDS, ChronoUnit.SECONDS)))
                .signWith(getRefreshSignKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String refreshToken(String refreshToken,EStatus status,ERole role) {
        try {
            Jws<Claims> claimsJws = extractRefreshClaim(refreshToken);
            String username = claimsJws.getBody().getSubject();
            return generateToken(username, status, role);
        } catch (Exception e) {
            // Handle invalid refresh token
            return null;
        }
    }

    public Boolean validateRefreshToken(String refreshToken) {
        try {
            Jws<Claims> claimsJws = extractRefreshClaim(refreshToken);
            String username = claimsJws.getBody().getSubject();
            return !isTokenExpired(refreshToken);
        } catch (Exception e) {
            return false; // Token không hợp lệ
        }
    }

    private Key getRefreshSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Jws<Claims> extractRefreshClaim(String token) {
        return Jwts.parser()
                .setSigningKey(getRefreshSignKey())
                .build()
                .parseClaimsJws(token);
    }

}