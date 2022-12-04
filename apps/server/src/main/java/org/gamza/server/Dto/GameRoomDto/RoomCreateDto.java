package org.gamza.server.Dto.GameRoomDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateDto {
  @NotBlank(message = "방 제목을 입력해주세요")
  private String roomName;
  private String password;
  private int roomSize;
}
