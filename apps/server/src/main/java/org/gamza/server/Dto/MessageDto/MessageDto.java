package org.gamza.server.Dto.MessageDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.Message;
import org.gamza.server.Entity.UserInfo;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
  private Message.MessageType type;
  private UserInfo userInfo;
  private GameRoom room;

  public Message toEntity() {
    return Message.builder()
      .type(type)
      .userInfo(userInfo)
      .gameRoom(room)
      .message("")
      .build();
  }
}
