package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.TokenDto.TokenApiResponse;
import org.gamza.server.Dto.UserDto.UserJoinDto;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/join")
  public ResponseEntity<String> join(@RequestBody UserJoinDto userJoinDto) {
    authService.join(userJoinDto);
    return ResponseEntity.ok("가입 완료");
  }

  @PostMapping("/login")
  public TokenApiResponse login(@RequestBody UserLoginDto userLoginDto) {
    return authService.login(userLoginDto);
  }

  @PostMapping("/reissue")
  public TokenApiResponse reissue(HttpServletRequest request) {
    return authService.refresh(request);
  }

  @PostMapping("/validate")
  public Boolean validate(HttpServletRequest request) {
    return authService.validateToken(request);
  }
}
