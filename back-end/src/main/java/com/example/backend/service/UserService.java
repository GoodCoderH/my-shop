package com.example.backend.service;

import com.example.backend.domain.User;
import com.example.backend.jwt.UserResponse;
import com.example.backend.repository.UserRepository;
import com.example.backend.security.SecurityUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User save(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found : " + username));
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public UserResponse getMyInfo() {
        return userRepository.findById(SecurityUtil.getCurrentUserId())
                .map(UserResponse::of)
                .orElseThrow(() -> new RuntimeException("Login user information is missing."));
    }

    public UserResponse getUserInfo(String username) {
        return userRepository.findByUsername(username)
                .map(UserResponse::of)
                .orElseThrow(() -> new RuntimeException("User information is missing."));
    }
}
