package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.GameDto.GameRequestDto;
import org.gamza.server.Dto.UserDto.UserRecordDto;
import org.gamza.server.Service.AuthService;
import org.gamza.server.Service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
public class GameController {

  private final GameService gameService;
  private final AuthService authService;

  @PostMapping("/game/result/save")
  public ResponseEntity<String> gameResultSave(@RequestBody GameRequestDto gameRequestDto) {
    gameService.gameResultSave(gameRequestDto);
    return new ResponseEntity<>("게임 데이터 저장 완료", HttpStatus.OK);
  }

//  @GetMapping("/token/myscore")
//  public UserRecordDto allScore(HttpServletRequest request) {
//    authService.validateToken(request);
//
//  }
}
