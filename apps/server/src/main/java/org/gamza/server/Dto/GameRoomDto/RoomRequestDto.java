package org.gamza.server.Dto.GameRoomDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;

import java.util.Map;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestDto {
  private String roomName;
  private Map<Integer, User> players;
  private RoomStatus roomStatus;
  private String password;

  public GameRoom toEntity() {
    GameRoom gameRoom = GameRoom.builder()
      .roomName(roomName)
      .players(players)
      .roomStatus(roomStatus)
      .password(password)
      .build();

    return gameRoom;
  }
}
