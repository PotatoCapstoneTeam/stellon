package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.GameRoomDto.RoomRequestDto;
import org.gamza.server.Dto.GameRoomDto.RoomResponseDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Service.RoomService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RoomController {

  private final RoomService roomService;

  @GetMapping("/room")
  public List<GameRoom> rooms() {
    return roomService.findRooms();
  }

  @PostMapping("/room")
  public RoomResponseDto createRoom(@RequestBody RoomRequestDto requestDto) {
    GameRoom room = roomService.addRoom(requestDto);
    RoomResponseDto roomResponseDto = new RoomResponseDto(room);

    return roomResponseDto;
  }
}
