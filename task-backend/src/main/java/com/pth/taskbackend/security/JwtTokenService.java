package com.pth.taskbackend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.util.*;

import static com.pth.taskbackend.util.constant.TokenConstant.*;

@Service
@RequiredArgsConstructor
public class JwtTokenService {
    private final UserDetailsService userDetailsService;
    static final String secret = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";
    //final String secret = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes());

    public String createToken(String type, String username, List<String> roleNames, long validityInMillis) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + validityInMillis);

        return Jwts.builder()
                .claims(Map.of(ROLES, roleNames))
                .subject(username)
                .issuedAt(now)
                .expiration(expiryDate)
                .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .header()
                .add(JWT_TOKEN_TYPE, type)
                .and()
                .compact();
    }

    public Optional<String> getTokenFromCookie(HttpServletRequest request, String cookieName) {
        Cookie[] cookies = Objects.requireNonNullElse(request.getCookies(), new Cookie[]{});

        return Arrays.stream(cookies)
                .filter(cookie -> cookieName.equals(cookie.getName()))
                .map(Cookie::getValue)
                .findFirst();
    }

    public boolean validateToken(String token) {
        Date expirationDate = getClaims(token).getPayload().getExpiration();
        return !expirationDate.before(new Date());
    }


    public boolean validateRefreshToken(String refreshToken) {
        if (!REFRESH_TOKEN_TYPE.equals(getClaims(refreshToken).getHeader().get(JWT_TOKEN_TYPE))) {
            throw new IllegalArgumentException("The token provided is not a %s".formatted(REFRESH_TOKEN_TYPE));
        }
        return validateToken(refreshToken);
    }

    public Authentication getAuthentication(String token) {
        String username = getClaims(token).getPayload().getSubject();
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public static Jws<Claims> getClaims(String token) {
        return Jwts.parser().
                verifyWith(Keys.hmacShaKeyFor(secret.getBytes()))
                .build().parseSignedClaims(token);
    }

    public static String getEmailFromAccessToken(HttpServletRequest request  ) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("app_access_token")) {
                    return JwtTokenService.getClaims(cookie.getValue()).getBody().getSubject();
                }
            }
        }
        return null;
    }

}

