package org.gamza.server.Dto.GameRoomDto;

import lombok.Getter;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Enum.RoomStatus;

@Getter
public class RoomResponseDto {
  private Long id;
  private String roomName;
  private RoomStatus roomStatus;

  public RoomResponseDto(GameRoom gameRoom) {
    this.id = gameRoom.getId();
    this.roomName = gameRoom.getRoomName();
    this.roomStatus = gameRoom.getRoomStatus();
  }
}
