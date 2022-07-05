package com.example.backend.jwt;

import com.example.backend.domain.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserResponse {

    private String username;

    public static UserResponse of(User user) {
        return new UserResponse(user.getUsername());
    }
}
