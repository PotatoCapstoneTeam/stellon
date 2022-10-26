package org.gamza.server.Service;

import org.gamza.server.Dto.ChatDto.ChatResponseDto;
import org.gamza.server.Entity.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class ChatService {
  public ChatResponseDto regenerateMsg(ChatModel message) {
    return ChatResponseDto.builder()
      .roomId(message.getGameRoom().getId())
      .nickname(message.getUser().getNickname())
      .message(message.getMessage())
      .build();
  }
}
