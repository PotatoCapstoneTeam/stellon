package org.gamza.server.Dto.ChatDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LobbyChatDto {
  private String nickname;
  private String message;
}
