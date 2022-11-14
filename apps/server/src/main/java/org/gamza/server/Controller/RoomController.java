package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.GameRoomDto.RoomCreateDto;
import org.gamza.server.Dto.GameRoomDto.RoomResponseDto;
import org.gamza.server.Dto.LobbyDto.LobbyResponseDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
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
  public RoomResponseDto createRoom(@RequestBody RoomCreateDto createDto) {
    GameRoom room = roomService.addRoom(createDto);
    RoomResponseDto roomResponseDto = new RoomResponseDto(room);

    return roomResponseDto;
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
}
