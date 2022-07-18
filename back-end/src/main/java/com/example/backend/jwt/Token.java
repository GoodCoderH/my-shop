package com.example.backend.jwt;

import com.example.backend.auth.Authority;
import lombok.Getter;
import lombok.Setter;

import javax.servlet.http.Cookie;

@Getter @Setter
public class Token {

    private String grantType;
    private String accessToken;
    private Cookie refreshToken;
    private Long accessTokenExpiresIn;
    private Long refreshTokenExpiresIn;
    private Authority roles;
}
