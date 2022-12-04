package org.gamza.server.Dto.GameRoomDto;

import lombok.Getter;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
public class RoomMessageDto {
  private Long id;
  private String roomName;
  private List<User> players;
  private RoomStatus roomStatus;
  private RoomType roomType;
  private int roomSize;

  public RoomMessageDto(GameRoom room) {
    this.id = room.getId();
    this.roomName = room.getRoomName();
    this.players = new ArrayList<>(room.getPlayers().values());
    this.roomStatus = room.getRoomStatus();
    this.roomType = room.getRoomType();
    this.roomSize = room.getRoomSize();
  }
}
