package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.TokenDto.TokenInfo;
import org.gamza.server.Dto.UserDto.UserJoinDto;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
@CrossOrigin(origins = "localhost:4200")
public class AuthController {

  private final AuthService authService;

  @PostMapping("/join")
  public ResponseEntity<String> join(@RequestBody UserJoinDto userJoinDto) {
    authService.join(userJoinDto);
    return ResponseEntity.ok("가입 완료");
  }

  @PostMapping("/login")
  public ResponseEntity<TokenInfo> login(@RequestBody UserLoginDto userLoginDto) {
    TokenInfo tokenInfo = authService.login(userLoginDto);
    return ResponseEntity.ok(tokenInfo);
  }

  @PostMapping("/reissue")
  public ResponseEntity<TokenInfo> reissue(@RequestBody TokenInfo tokenInfo) {
    TokenInfo newTokenInfo = authService.refresh(tokenInfo);
    return ResponseEntity.ok(newTokenInfo);
  }
}
