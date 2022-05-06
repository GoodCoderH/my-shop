package com.example.backend.jwt;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Getter
@Component
public class JwtProperties {

    @Value("${jwt.password}")
    private String secret;

    private final int expirationTime = 864000000;

    private final String tokenPrefix = "Bearer ";

    private final String headerString = "Authorization";
}
