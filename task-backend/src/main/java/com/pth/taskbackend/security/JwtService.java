package com.pth.taskbackend.security;

import com.pth.taskbackend.enums.ERole;
import com.pth.taskbackend.enums.EStatus;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
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

    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    public static final int REFRESH_TOKEN_EXPIRATION_SECONDS =30 * 24 * 60 * 60;
    private List<String> validTokens = new ArrayList<>();
    public String generateToken(String username, EStatus status, ERole role) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username, status,role);
    }

    private String createToken(Map<String, Object> claims, String username,EStatus status,ERole role) {
        String token = Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .claim("status",status)
                .claim("role",role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * 24 * 90))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();
        validTokens.add(token);
        return token;


    }

    private Key getSignKey() {
        byte[] keyBytes= Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
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
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public String generateRefreshToken(String username,EStatus status,ERole role) {
        Instant now = Instant.now();
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(Date.from(now))
                .claim("status",status)
                .claim("role",role)
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