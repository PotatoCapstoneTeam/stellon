package org.gamza.server.Dto.GameRoomDto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.gamza.server.Enum.RoomStatus;

@Builder
@Getter
@Setter
public class FindRoomDto {
  private Long id;
  private String roomName;
  private RoomStatus roomStatus;
}
