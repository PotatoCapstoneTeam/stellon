package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameDto.GameMessageDto;
import org.gamza.server.Dto.UserDto.AddUserDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.Message;
import org.gamza.server.Entity.User;
import org.gamza.server.Entity.UserInfo;
import org.gamza.server.Enum.ReadyStatus;
import org.gamza.server.Enum.TeamStatus;
import org.gamza.server.Enum.UserStatus;
import org.gamza.server.Service.RoomService;
import org.gamza.server.Service.User.UserService;
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
  private final UserService userService;
  private final RoomService roomService;

  @EventListener
  public void webSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

    // 헤더에 저장했던 유저인포와 방 id 가져오기
    UserInfo userInfo = (UserInfo) accessor.getSessionAttributes().get("userInfo");
    Long roomId = (Long) accessor.getSessionAttributes().get("roomId");

    if(!userInfo.getUser().getNickname().isEmpty() && !roomId.toString().isEmpty()) {
      // 유저 찾기
      User user = userService.findByNickname(userInfo.getUser().getNickname());

      // 방 찾기
      GameRoom room = roomService.findRoom(roomId);
      // 방 Dto 로 변경
      GameMessageDto roomDto = roomService.roomMessageDto(room);

      // 메시지 생성
      Message message = Message.builder()
        .type(Message.MessageType.EXIT)
        .userInfo(UserInfo.builder().system("system").build())
        .gameRoom(roomDto)
        .build();

      // 유저 정보 수정
      userService.initStatus(user.getNickname());

      // 방에서 해당 유저 삭제
      roomService.removeUserToRoom(roomId, userInfo);

      message.setMessage(userInfo.getUser().getNickname() + "님이 퇴장하셨습니다.");
      message.setGameRoom(roomService.roomMessageDto(roomService.findRoom(roomId)));

      // 방이 빈 방이면 방 삭제 후 리턴
      if (roomService.getRoomUsers(roomId).isEmpty()) {
        roomService.removeRoom(roomId);
        return;
      }

//      // 나간 애가 방장이면 방장 새로 선출
//      if(userInfo.getUserStatus().equals(UserStatus.ROLE_MANAGER)) {
//        selectNewHost(room);
//      }

      operations.convertAndSend("/sub/room/" + roomId, message);
    }
  }
//
//  private void selectNewHost(GameRoom room) {
//    for (int i = 0; i <= room.getRoomSize(); i++) {
//      if(room.getPlayers().containsKey(i)) {
//        log.info("방장 선발");
//        User findUser = room.getPlayers().get(i);
//        UserInfo hostInfo = UserInfo.builder()
//          .user(findUser)
//          .userStatus(UserStatus.ROLE_MANAGER)
//          .build();
//        Message newHostMsg = Message.builder()
//          .type(Message.MessageType.ROOM)
//          .gameRoom(room)
//          .userInfo(hostInfo)
//          .message(hostInfo.getUser().getNickname() + "님이 방장이 되셨습니다.").build();
//        operations.convertAndSend("/sub/room/" + room.getId(), newHostMsg);
//        break;
//      }
//    }
//  }
}
