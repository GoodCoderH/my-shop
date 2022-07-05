package com.example.backend.jwt;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
public class TokenRequest {

    private String accessToken;
    private String refreshToken;
}
