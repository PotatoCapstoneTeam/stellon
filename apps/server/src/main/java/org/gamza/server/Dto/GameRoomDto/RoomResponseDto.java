package org.gamza.server.Dto.GameRoomDto;

import lombok.Getter;
import org.gamza.server.Enum.RoomStatus;

@Getter
public class RoomResponseDto {
  private Long id;
  private String roomName;
  private RoomStatus roomStatus;

}
