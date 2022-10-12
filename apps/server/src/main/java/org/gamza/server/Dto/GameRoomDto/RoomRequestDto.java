package org.gamza.server.Dto.GameRoomDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.TeamStatus;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomRequestDto {
  private String roomName;
  private List<User> players;
  private RoomStatus roomStatus;
  private TeamStatus victoryTeam;
  private LocalDateTime endTime;

  public GameRoom toEntity() {
    GameRoom gameRoom = GameRoom.builder()
      .roomName(roomName)
      .players(players)
      .roomStatus(roomStatus)
      .victoryTeam(victoryTeam)
      .endTime(endTime)
      .build();

    return gameRoom;
  }
}
