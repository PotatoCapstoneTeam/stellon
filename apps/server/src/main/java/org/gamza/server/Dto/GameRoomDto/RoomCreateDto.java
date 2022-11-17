package org.gamza.server.Dto.GameRoomDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoomCreateDto {
  @NotBlank(message = "방 제목을 입력해주세요")
  private String roomName;
  private String password;
  @NotBlank(message = "인원수를 입력해주세요")
  private int roomSize;
}
