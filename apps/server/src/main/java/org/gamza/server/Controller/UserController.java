package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Service.User.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
  private final UserService userService;

  @DeleteMapping("/delete")
  public ResponseEntity<String> remove(@RequestBody UserLoginDto loginDto) {
    userService.removeUser(loginDto);
    return ResponseEntity.ok("삭제 완료");
  }
}
