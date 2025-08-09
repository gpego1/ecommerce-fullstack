package io.github.eletropronto.demo.security;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private String SECRET = "QmFzZTY0U2VjdXJlS2V5Rm9ySldUQXV0aGVudGljYXRpb24=";

    private Key getSignInKey(){
        byte[] keyBites = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBites);
    }

    //Gera o token para o usuario
    public String generateToken(UserDetails userDetails){
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) //1 hora
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsTFunction){
        final Claims claims = extractAllClaims(token);
        return claimsTFunction.apply(claims);
    }

    // Validate if is a valid Token
    public boolean isTokenValid(String token, String username){
        return (extractUsername(token).equals(username)) && !isTokenExpired(token);
    }

    // Validate if the token is expired or no
    public boolean isTokenExpired(String token){
        return extractExpirationTime(token).before(new Date());
    }

    private Date extractExpirationTime(String token){
        return extractClaim(token, Claims::getExpiration);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
