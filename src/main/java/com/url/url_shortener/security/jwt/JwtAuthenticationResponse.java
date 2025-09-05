package com.url.url_shortener.security.jwt;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthenticationResponse {
    private final String token;

    public JwtAuthenticationResponse(String token) {
        this.token = token;
    }
}
