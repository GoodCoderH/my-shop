package com.example.backend.jwt;

import com.example.backend.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!hasAuthorizationHeader(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = getAccessToken(request);

        if (!jwtUtil.validateToken(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }

        setAuthenticationContext(accessToken, request);

        filterChain.doFilter(request, response);
    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken);

        UsernamePasswordAuthenticationToken authentication
                = new UsernamePasswordAuthenticationToken(userDetails, null, null);

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private UserDetails getUserDetails(String accessToken) {
        User userDetails = new User();
        String subject = jwtUtil.getSubject(accessToken);

        log.info("getUserDetails : {}", subject);

        userDetails.setUsername(subject);

        return userDetails;

    }

    private boolean hasAuthorizationHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        log.info("Authorization header: {}", header);

        if (ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")) {
            return false;
        }

        return true;
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        log.info("Access token: {}", token);
        return token;
    }
}
