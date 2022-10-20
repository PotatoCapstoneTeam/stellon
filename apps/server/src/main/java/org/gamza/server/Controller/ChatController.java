package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.ChatDto.ChatResponseDto;
import org.gamza.server.Entity.ChatModel;
import org.gamza.server.Service.ChatService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {
  private final SimpMessageSendingOperations sendingOperations;
  private final ChatService chatService;

  @MessageMapping("/socket/chat")
  public void send(ChatModel message) {
    ChatResponseDto newMessage = chatService.regenerateMsg(message);
    sendingOperations.convertAndSend("/sub/room/" + newMessage.getRoomId(), newMessage);
  }
}
