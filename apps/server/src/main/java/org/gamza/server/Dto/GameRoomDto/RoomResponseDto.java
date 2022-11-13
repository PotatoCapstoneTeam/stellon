package org.gamza.server.Dto.GameRoomDto;

import lombok.Getter;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;

import java.util.Map;

@Getter
public class RoomResponseDto {
  private Long id;
  private String roomName;
  private Map<Integer, User> players;
  private RoomStatus roomStatus;
  private int roomSize;
  private String map;

  public RoomResponseDto(GameRoom gameRoom) {
    this.id = gameRoom.getId();
    this.roomName = gameRoom.getRoomName();
    this.players = gameRoom.getPlayers();
    this.roomStatus = gameRoom.getRoomStatus();
    this.roomSize = gameRoom.getRoomSize();
    this.map = "파이썬";
  }
}
