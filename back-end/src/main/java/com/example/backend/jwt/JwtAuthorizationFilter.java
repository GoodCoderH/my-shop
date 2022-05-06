package com.example.backend.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.example.backend.auth.PrincipalDetails;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;
    private final JwtProperties jwtProperties;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, JwtProperties jwtProperties) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.jwtProperties = jwtProperties;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        log.info("인증이나 권한이 필요한 주소 요청");
        String jwtHeader = request.getHeader(jwtProperties.getHeaderString());

        if (jwtHeader == null || !jwtHeader.startsWith(jwtProperties.getTokenPrefix())) {
            chain.doFilter(request, response);
            return;
        }

        String token = request.getHeader(jwtProperties.getHeaderString()).replace(jwtProperties.getTokenPrefix(), "");
        String username = JWT
                .require(Algorithm.HMAC512(jwtProperties.getSecret()))
                .build().verify(token).getClaim("username").asString();

        if (username != null) {
            User userEntity = userRepository.findByUsername(username);

            PrincipalDetails principalDetails = new PrincipalDetails(userEntity);
            Authentication authentication =
                    new UsernamePasswordAuthenticationToken(principalDetails,
                            null, principalDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authentication);

            chain.doFilter(request, response);
        }



    }
}
