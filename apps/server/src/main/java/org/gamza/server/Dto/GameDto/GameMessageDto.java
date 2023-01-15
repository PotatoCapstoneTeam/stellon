package org.gamza.server.Dto.GameDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.gamza.server.Dto.UserDto.AddUserDto;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;

import java.util.Map;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameMessageDto {
  private Long id;
  private String roomName;
  private Map<Integer, AddUserDto> players;
  private RoomStatus roomStatus;
  private RoomType roomType;
  private int roomSize;
}
