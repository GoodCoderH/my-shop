package com.example.backend.jwt;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Getter
@Component
public class JwtProperties {
    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.issuer}")
    private String issuer;

    private final Date expirationTime = new Date(System.currentTimeMillis() + 30 * 6 * 1000);

    private final String tokenPrefix = "Bearer ";

    private final String headerString = "Authorization";
}
