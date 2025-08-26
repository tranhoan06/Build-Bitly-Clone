package com.url.url_shortener.security.jwt;

import com.url.url_shortener.service.UserDetailImpl;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUtils {
    @Value("${jwt.srcret}")
    private String jwtSecret;

    @Value("${jwt.expiration}")
    private int jwtExpirationMs;


    public String getJwtFromHeader(HttpServletRequest request) {
        String bearToken = request.getHeader("Authorization");
        if (bearToken != null && bearToken.startsWith("Bearer ")) {
            return bearToken.substring(7);
        }
        return null;
    }

    public String generateToken(UserDetailImpl userDetail) {
        String username = userDetail.getUsername();
        String roles = userDetail.getAuthorities().stream()
                .map(authoriry -> authoriry.getAuthority())
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(username)                              // subject
                .claim("roles", roles)                             // custom claim
                .setIssuedAt(new Date())                           // thời gian phát hành
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // hết hạn (2 ngày)
                .signWith(key())                                     // ký token
                .compact();
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parserBuilder()              // ✅ dùng parserBuilder() thay vì parser()
                .setSigningKey((SecretKey) key())              // hoặc .verifyWith(key) trong 0.12.x
                .build()
                .parseClaimsJws(token)           // parse token
                .getBody()
                .getSubject();
    }

    private Key key() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parserBuilder()              // ✅ dùng parserBuilder() thay vì parser()
                    .setSigningKey((SecretKey) key())              // hoặc .verifyWith(key) trong 0.12.x
                    .build()
                    .parseClaimsJws(authToken);
            return true;
        } catch (ExpiredJwtException e) {
            throw new RuntimeException(e);
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException(e);
        } catch (MalformedJwtException e) {
            throw new RuntimeException(e);
        } catch (SignatureException e) {
            throw new RuntimeException(e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
