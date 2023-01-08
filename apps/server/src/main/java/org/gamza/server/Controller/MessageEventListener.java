package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Entity.Message;
import org.gamza.server.Entity.UserInfo;
import org.gamza.server.Enum.UserStatus;
import org.gamza.server.Service.MessageService;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
@RequiredArgsConstructor
@Slf4j
public class MessageEventListener {
  private final SimpMessageSendingOperations operations;
  private final MessageService messageService;

  @EventListener
  public void webSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

    // 헤더에 저장했던 유저인포와 방 id 가져오기
    UserInfo userInfo = (UserInfo) accessor.getSessionAttributes().get("userInfo");
    Long roomId = (Long) accessor.getSessionAttributes().get("roomId");
    Message message = Message.builder().build();

    if(!userInfo.getUser().getNickname().isEmpty() && !roomId.toString().isEmpty()) {
      message = messageService.disconnect(userInfo, roomId);

//      // 나간 애가 방장이면 방장 새로 선출
//      if(!message.getMessage().equals("empty") && userInfo.getUserStatus().equals(UserStatus.ROLE_MANAGER)) {
//        messageService.selectNewHost(roomId);
//      }

    }
    operations.convertAndSend("/sub/room/" + roomId, message);
  }
}
