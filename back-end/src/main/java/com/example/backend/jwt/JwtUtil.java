package com.example.backend.jwt;

import com.example.backend.domain.User;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final JwtProperties jwtProperties;

    public String generateAccessToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(new Date())
                .setExpiration(jwtProperties.getExpirationTime())
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();
    }

    public Cookie generateRefreshToken(User user) {

        String refreshToken = Jwts.builder()
                .setSubject(user.getUsername())
                .setIssuer(jwtProperties.getIssuer())
                .setIssuedAt(new Date())
                .setExpiration(jwtProperties.getExpirationTime())
                .signWith(SignatureAlgorithm.HS512, jwtProperties.getSecret())
                .compact();

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");

        return cookie;
    }

    public boolean validateAccessToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtProperties.getSecret()).parseClaimsJws(token);
            return true;
        } catch (IllegalArgumentException e) {
            log.error("Token is null, empty or only whitespace : {}", e.getMessage());
        } catch (MalformedJwtException e) {
            log.error("JWT is invalid : {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            log.error("JWT is not supported : {}", e.getMessage());
        } catch (SignatureException e) {
            log.error("Signature validation failed");
        } catch (JwtException e) {
            log.error("JWT exception : {}", e.getMessage());
        }

        return false;
    }

    public String getSubject(String token) {
        return parseClaims(token).getSubject();
    }

    private Claims parseClaims(String token) {
        return Jwts.parser()
                .setSigningKey(jwtProperties.getSecret())
                .parseClaimsJws(token)
                .getBody();
    }

}
