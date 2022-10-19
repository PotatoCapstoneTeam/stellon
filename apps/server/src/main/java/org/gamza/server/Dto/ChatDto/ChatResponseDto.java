package org.gamza.server.Dto.ChatDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatResponseDto {
  private Long roomId;
  private String nickname;
  private String message;
}
