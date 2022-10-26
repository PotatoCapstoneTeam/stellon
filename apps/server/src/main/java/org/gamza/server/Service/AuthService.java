package org.gamza.server.Service;

import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.TokenDto.TokenInfo;
import org.gamza.server.Dto.UserDto.UserJoinDto;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Entity.CustomUserDetails;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.Authority;
import org.gamza.server.Repository.UserRepository;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final AuthenticationManagerBuilder authenticationManagerBuilder;
  private final JwtTokenProvider jwtTokenProvider;

  @Transactional
  public void join(UserJoinDto userJoinDto) {
    isDuplicateUser(userJoinDto);
    User joinUser = User.builder().email(userJoinDto.getEmail())
      .nickname(userJoinDto.getNickname())
      .password(passwordEncoder.encode(userJoinDto.getPassword()))
      .authority(Authority.ROLE_USER)
      .build();
    userRepository.save(joinUser);
  }

  private void isDuplicateUser(UserJoinDto userJoinDto) {
    if (userRepository.findByEmail(userJoinDto.getEmail()).isPresent()) {
      throw new RuntimeException("이미 존재하는 Email 입니다");
    }
    if (userRepository.existsByNickname(userJoinDto.getNickname())) {
      throw new RuntimeException("이미 존재하는 nickname 입니다");
    }
  }

  @Transactional
  public TokenInfo login(UserLoginDto userLoginDto) {
    // 0. 유저 검증
    validateUser(userLoginDto);

    // 1. 권한토큰 객체 생성
    UsernamePasswordAuthenticationToken authenticationToken =
      new UsernamePasswordAuthenticationToken(userLoginDto.getEmail(), userLoginDto.getPassword());

    // 2. authentication 토큰 기반으로 authentication 객체 생성
    Authentication authentication = authenticationManagerBuilder.getObject()
      .authenticate(authenticationToken);

    // 3. 인증 정보 기반으로 실제 토큰 생성
    TokenInfo tokenInfo = jwtTokenProvider.generateToken(authentication);

    // 4. user 의 refresh 토큰 정보 업데이트
    User findUser = userRepository.findByEmail(userLoginDto.getEmail())
      .orElseThrow(() -> new RuntimeException("존재하지 않는 Email 입니다"));
    findUser.updateToken(tokenInfo.getRefreshToken());

    return tokenInfo;
  }

  private void validateUser(UserLoginDto userLoginDto) {
    User findUser = userRepository.findByEmail(userLoginDto.getEmail())
      .orElseThrow(() -> new RuntimeException("존재하지 않는 Email 입니다"));
    if (!passwordEncoder.matches(userLoginDto.getPassword(), findUser.getPassword())) {
      throw new RuntimeException("비밀번호가 일치하지 않습니다");
    }
  }

  @Transactional
  public TokenInfo refresh(TokenInfo tokenInfo) {
    // refresh 토큰 유효성 검사
    if (tokenInfo.getRefreshToken() != null && jwtTokenProvider.validateToken(tokenInfo.getRefreshToken())) {
      // access 토큰 쪼개서 username 가져오고 refresh 토큰과 비교
      String email = jwtTokenProvider.parseClaims(tokenInfo.getAccessToken()).getSubject();
      if (!Objects.equals(email, jwtTokenProvider.parseClaims(tokenInfo.getRefreshToken()).getSubject())) {
        throw new JwtException("유효하지 않은 토큰 입니다");
      }
      Optional<User> findUser = userRepository.findByEmail(email);
      String findRefreshToken = findUser.get().getRefreshToken();
      if (findRefreshToken == null) {
        throw new UsernameNotFoundException("사용자를 찾을 수 없습니다");
      }
      if (!findRefreshToken.equals(tokenInfo.getRefreshToken())) {
        throw new JwtException("유효하지 않은 토큰 입니다");
      }

      // Access 토큰 재발급
      CustomUserDetails userDetail = new CustomUserDetails(findUser.get());
      String authorities = userDetail.getAuthorities()
        .stream().map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(","));
      String newAccessToken = jwtTokenProvider.recreateAccessToken(email, authorities);

      // Refresh 토큰 만료시간 1일 미만일 시 refresh 토큰 update 후 발급
      if (jwtTokenProvider.reissueRefreshToken(tokenInfo.getRefreshToken())) {
        String newRefreshToken = jwtTokenProvider.createRefreshToken(email);
        findUser.get().updateToken(newRefreshToken);
      }

      return TokenInfo.builder()
        .accessToken(newAccessToken)
        .refreshToken(tokenInfo.getRefreshToken())
        .build();
    }
    throw new JwtException("유효하지 않은 refresh 토큰 입니당");
  }
}
