package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameDto.StageDataDto;
import org.gamza.server.Dto.GameDto.StageRequestDto;
import org.gamza.server.Dto.MessageDto.MessageRequestDto;
import org.gamza.server.Entity.Message;
import org.gamza.server.Service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.security.Principal;
@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageController {
  private final MessageService messageService;
  private final SimpMessageSendingOperations operations;

  @MessageMapping("/message")
  public void sendMessage(Principal principal, @Payload MessageRequestDto messageDto, SimpMessageHeaderAccessor headerAccessor) {

    Message message = Message.builder().build();

    messageService.checkRoomType(messageDto);

    switch (messageDto.getType()) {
      case JOIN:
        message = messageService.joinService(principal, messageDto, headerAccessor);
        break;

      case START:
        message = messageService.checkStart(messageDto, headerAccessor);

        if(message.getMessage() != "") break;

        ResponseEntity<StageRequestDto> response = messageService.startService(messageDto);

        for (StageDataDto stageDataDto : response.getBody().getUsers()) {
          message.setToken(stageDataDto.getToken());
          operations.convertAndSendToUser(messageService.getPrincipal(stageDataDto.getId()),
            "/sub/room/" + messageDto.getRoomId(), message);
        }
        return;

      case CHANGE:
        message = messageService.changeService(messageDto);
        break;

      case READY:
        message = messageService.readyService(messageDto);
        break;
    }
    operations.convertAndSend("/sub/room/" + messageDto.getRoomId(), message);
  }
}
