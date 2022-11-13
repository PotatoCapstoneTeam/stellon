package org.gamza.server.Config.JWT;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.TokenDto.TokenInfo;
import org.gamza.server.Error.ErrorCode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.servlet.ServletRequest;
import java.security.Key;
import java.time.Duration;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtTokenProvider {
  private final Key key;
  // Access 토큰 검증 시간 30분
  @Value("${jwt.accessTokenExpiration}")
  private long accessTokenExpiration;

  // Refresh 토큰 기간 7일
  @Value("${jwt.refreshTokenExpiration}")
  private long refreshTokenExpiration;

  public JwtTokenProvider(@Value("${jwt.secret}") String secretKey) {
    this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
  }

  // 토큰 발행 메서드
  public TokenInfo generateToken(Authentication authentication) {
    // 권한 가져오기
    String authorities = authentication.getAuthorities().stream()
      .map(GrantedAuthority::getAuthority)
      .collect(Collectors.joining(","));

    Claims claims = Jwts.claims().setSubject(authentication.getName());
    claims.put("auth", authorities);

    Date now = new Date();

    // AccessToken 생성
    String accessToken = Jwts.builder()
      .setClaims(claims)
      .setExpiration(new Date(now.getTime() + accessTokenExpiration))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();

    // RefreshToken 생성
    String refreshToken = createRefreshToken(authentication.getName());

    return TokenInfo.builder()
      .accessToken(accessToken)
      .refreshToken(refreshToken)
      .build();
  }

  public String createRefreshToken(String email) {
    Date now = new Date();
    String refreshToken = Jwts.builder()
      .setSubject(email)
      .setExpiration(new Date(now.getTime() + refreshTokenExpiration))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();
    return refreshToken;
  }

  // JWT 토큰 복호화 -> 정보 꺼내기, 만료됐으면 parseClaims 에서 자동으로 예외처리 됨
  public Authentication getAuthentication(String token) {
    // 토큰 복호화 작업
    Claims claims = parseClaims(token);

    if (claims.get("auth") == null) {
      throw new RuntimeException("권한 정보가 없는 토큰입니다.");
    }

    // Claim 에서 권한정보 가져오기
    Collection<? extends GrantedAuthority> authorities =
      Arrays.stream(claims.get("auth").toString().split(","))
        .map(SimpleGrantedAuthority::new)
        .collect(Collectors.toList());

    // UserDetails 객체 만들어서 Authentication 리턴
    UserDetails userDetails = new User(claims.getSubject(), "", authorities);
    return new UsernamePasswordAuthenticationToken(userDetails, "", authorities);
  }

  // 토큰 정보 검증 메서드, 검증 실패 시 에러코드 반환
  public boolean validateToken(ServletRequest request, String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build()
        .parseClaimsJws(token);
      return true;
    } catch (ExpiredJwtException e) {
      request.setAttribute("exception", ErrorCode.EXPIRED_TOKEN);
    } catch (IllegalArgumentException e) {
      request.setAttribute("exception", ErrorCode.NON_LOGIN);
    } catch (SignatureException | UnsupportedJwtException | SecurityException | MalformedJwtException e) {
      request.setAttribute("exception", ErrorCode.INVALID_TOKEN);
    } catch (Exception e) {
      log.error("================================================");
      log.error("JwtFilter - doFilterInternal() 오류발생");
      log.error("token : {}", token);
      log.error("Exception Message : {}", e.getMessage());
      log.error("================================================");
      request.setAttribute("exception", ErrorCode.INVALID_TOKEN.getCode());
    }
    return false;
  }

  public String recreateAccessToken(String email, Object auth) {
    Claims claims = Jwts.claims().setSubject(email);
    claims.put("auth", auth);

    Date now = new Date();

    String accessToken = Jwts.builder()
      .setClaims(claims)
      .setExpiration(new Date(now.getTime() + accessTokenExpiration))
      .signWith(key, SignatureAlgorithm.HS256)
      .compact();

    return accessToken;
  }

  public Claims parseClaims(String token) {
    return Jwts.parserBuilder().setSigningKey(key).build()
      .parseClaimsJws(token).getBody();
  }

  // refresh 토큰 만료가 1일 미만일 때 true 반환
  public boolean reissueRefreshToken(String refreshToken) {
    Claims claims = parseClaims(refreshToken);

    Date now = new Date();

    Date expTime = new Date(claims.getExpiration().getTime() - Duration.ofDays(1).toMillis());
    if (expTime.before(now)) {
      return true;
    }
    return false;
  }
}

