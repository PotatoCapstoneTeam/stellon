package org.gamza.server.Dto.LobbyDto;

import lombok.Getter;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;

import java.util.Map;

@Getter
public class LobbyResponseDto {
  private Long id;
  private String lobbyName;
  private Map<Integer, User> players;
  private RoomStatus lobbyStatus;
  private RoomType lobbyType;
  private int lobbySize;

  public LobbyResponseDto(GameRoom room) {
    this.id = room.getId();
    this.lobbyName = room.getRoomName();
    this.players = room.getPlayers();
    this.lobbyStatus = room.getRoomStatus();
    this.lobbyType = room.getRoomType();
    this.lobbySize = room.getRoomSize();
  }
}
