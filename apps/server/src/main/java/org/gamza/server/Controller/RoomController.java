package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.GameRoomDto.FindRoomDto;
import org.gamza.server.Dto.GameRoomDto.RoomCreateDto;
import org.gamza.server.Dto.GameRoomDto.RoomResponseDto;
import org.gamza.server.Dto.LobbyDto.LobbyResponseDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/room")
public class RoomController {

  private final RoomService roomService;

  @GetMapping("")
  public List<RoomResponseDto> rooms() {
    return roomService.findGameRooms();
  }

  @PostMapping("")
  public RoomResponseDto createRoom(@Valid @RequestBody RoomCreateDto createDto) {
    GameRoom room = roomService.addRoom(createDto);
    RoomResponseDto roomResponseDto = new RoomResponseDto(room);

    return roomResponseDto;
  }

  @PostMapping("/validate")
  public ResponseEntity<String> validateRoom(@RequestBody FindRoomDto findRoomDto) {

    roomService.validateRoomPass(findRoomDto);
    return ResponseEntity.ok("검증 완료");
  }

  @PostMapping("/lobby")
  public LobbyResponseDto createLobby() {
    GameRoom lobby = roomService.addLobby();
    LobbyResponseDto lobbyResponseDto = new LobbyResponseDto(lobby);
    return lobbyResponseDto;
  }

  @GetMapping("/lobby/users")
  public List<UserResponseDto> getLobbyUsers() {
    return roomService.getLobbyUsers();
  }

  @PostMapping("/lobby/users")
  public ResponseEntity<String> addUserToLobby(HttpServletRequest request) {
    roomService.addUserToLobby(request);
    return ResponseEntity.ok("접속 완료");
  }

  @DeleteMapping("/lobby/users")
  public ResponseEntity<String> removeUserToLobby(HttpServletRequest request) {
    roomService.removeUserToLobby(request);
    return ResponseEntity.ok("로비 리스트에서 유저 제거 완료");
  }
}
