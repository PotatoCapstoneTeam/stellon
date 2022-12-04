package org.gamza.server.Dto.MessageDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.gamza.server.Entity.Message;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageRequestDto {
  private Message.MessageType type;
  private Long roomId;
  private String nickname;
}
