package com.cv.demo.config;

import com.cv.demo.utils.CustomUserDetails;
import com.cv.demo.utils.CustomUserDetailsService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@AllArgsConstructor
@Service
public class JwtService {
    private final String SECRET_KEY = "7f98b5a7d439eb0988c2b7d1e61e0f241eeb22f68f6e3aa91875ebc8df0748b1";
    private CustomUserDetailsService userDetailsService;

    public Map<String, String> generate(String username) {
        CustomUserDetails userDetails = (CustomUserDetails) this.userDetailsService.loadUserByUsername(username);
        return this.generateJwt(userDetails);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = this.getClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    private <T> T getClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(this.getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String extractUsername(String token) {
        return this.getClaim(token, Claims::getSubject);
    }

    private Map<String, String> generateJwt(CustomUserDetails userDetails) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + 30 * 60 * 1000; // Durée de validité du token (30 minutes)

        final Map<String, Object> claims = Map.of(
                "nom", userDetails.getLastName(), // Ajoutez les autres attributs nécessaires
                Claims.EXPIRATION, new Date(expirationTime),
                Claims.SUBJECT, userDetails.getUsername()
        );

        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(userDetails.getUsername())
                .setClaims(claims)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
        return Map.of("bearer", bearer);
    }

    private Key getKey() {
        final byte[] decoder = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(decoder);
    }
}

