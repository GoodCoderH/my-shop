package com.example.backend.auth;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.servlet.http.Cookie;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {

    private String username;
    private String accessToken;
    private Cookie refreshToken;

}
