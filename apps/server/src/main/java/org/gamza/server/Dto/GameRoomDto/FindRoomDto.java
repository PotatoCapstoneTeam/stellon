package org.gamza.server.Dto.GameRoomDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.gamza.server.Enum.RoomStatus;

@Builder
@Getter
@Setter
public class FindRoomDto {
  private Long roomId;
  private String roomName;
  private String password;
}
