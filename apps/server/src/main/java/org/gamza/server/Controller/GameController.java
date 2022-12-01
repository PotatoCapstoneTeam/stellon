package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.GameDto.GameRequestDto;
import org.gamza.server.Dto.GameDto.GameResponseDto;
import org.gamza.server.Service.GameService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class GameController {

  private final GameService gameService;

  @PostMapping("/game/reqeust")
  public ResponseEntity<String> gameRequest(@RequestBody GameRequestDto gameRequestDto) {
    gameService.gameRequest(gameRequestDto);
    return new ResponseEntity<>("게임 데이터 저장 완료", HttpStatus.OK);
  }
}
