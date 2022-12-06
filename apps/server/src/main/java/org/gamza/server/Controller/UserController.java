package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Dto.UserDto.UserRecordDto;
import org.gamza.server.Dto.UserDto.UserRequestDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Service.User.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {
  private final UserService userService;

  @GetMapping
  public UserRecordDto getUserRecordByToken(HttpServletRequest request) {
    return userService.getUserRecordByToken(request);
  }

  @GetMapping("/all")
  public List<UserResponseDto> findAllUser() {
    return userService.findAll();
  }

  @DeleteMapping("/delete")
  public ResponseEntity<String> remove(@RequestBody UserLoginDto loginDto) {
    userService.removeUser(loginDto);
    return ResponseEntity.ok("삭제 완료");
  }

  // 유저 전체 삭제
  @DeleteMapping("/delete/all")
  public ResponseEntity<String> removeAll() {
    userService.removeAll();
    return ResponseEntity.ok("회원 정보 전체 삭제 완료");
  }
}
