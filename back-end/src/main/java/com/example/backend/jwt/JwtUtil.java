package com.example.backend.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.backend.domain.User;
import com.example.backend.repository.UserRepository;
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
    private final UserRepository userRepository;

    public String generateAccessToken(User user) {

        return JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30000))
                .sign(Algorithm.HMAC512(jwtProperties.getSecret().getBytes()));
    }

    public Cookie generateRefreshToken(User user) {

        String refreshToken = JWT.create()
                .withSubject(user.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 180 * 1000))
                .sign(Algorithm.HMAC512(jwtProperties.getSecret().getBytes()));

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setHttpOnly(true);
//        cookie.setSecure(true);

        return cookie;
    }

    public boolean validateToken(String token) {

        try {
            String username = getSubject(token);
            return userRepository.findByUsername(username).isPresent();
        } catch (Exception e) {
            return false;
        }

    }

    public String getSubject(String token) {
        JWTVerifier jwtVerifier
                = JWT.require(Algorithm.HMAC512(jwtProperties.getSecret().getBytes())).build();
        DecodedJWT decodedJWT = jwtVerifier.verify(token);

        return decodedJWT.getSubject();
    }

}
