package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameRoomDto.FindRoomDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.Message;
import org.gamza.server.Entity.User;
import org.gamza.server.Entity.UserInfo;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.RoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import static org.gamza.server.Enum.UserStatus.ROLE_MANAGER;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageController {

  private final RoomService roomService;
  private final UserRepository userRepository;
  private final RoomRepository roomRepository;
  private final SimpMessageSendingOperations operations;

  @MessageMapping("socket/message")
  public void sendMessage(Message message, SimpMessageHeaderAccessor headerAccessor) {
    UserInfo userInfo = message.getUserInfo();
    FindRoomDto findRoomDto = FindRoomDto.builder()
      .id(message.getGameRoom().getId())
      .roomName(message.getGameRoom().getRoomName())
      .roomStatus(message.getGameRoom().getRoomStatus())
      .build();

    User user = userRepository.findByNickname(userInfo.getUser().getNickname());
    GameRoom room = roomService.findRoom(findRoomDto);
    UserInfo system = UserInfo.builder()
      .system("system")
      .build();
    message.setGameRoom(room);

    switch (message.getType()) { // 메시지 타입 검사
      case JOIN: // 방 입장
        message.setMessage(userInfo.getUser().getNickname() + "님이 입장하셨습니다.");

        // 최대 8명 까지 할당 번호 검사하여 없으면 할당
        for (int i = 1; i <= 8; i++) {
          if (room.getPlayers().size() == 1) { // 방이 처음 만들어졌을 시 방장 설정
            userInfo.setUserStatus(ROLE_MANAGER);
          }

          if (room.getPlayers().get(i) == null) {
            room.getPlayers().put(i, user);
            userInfo.setPlayerNumber(i);

            roomRepository.save(room);

            headerAccessor.getSessionAttributes().put("user", userInfo);
            headerAccessor.getSessionAttributes().put("roomId", message.getGameRoom().getId());
            break;
          }
        }
        break;
      case START:
        if (room.getPlayers().size() % 2 == 1) {
          message.setMessage("인원 수가 맞지 않아 시작할 수 없습니다.");
          break;
        }
        message.setUserInfo(system);
        message.setMessage("곧 게임이 시작됩니다.");
        break;
      case EXIT:
        UserInfo pickUserInfo = (UserInfo) headerAccessor.getSessionAttributes().get("user");
        room.getPlayers().remove(pickUserInfo.getPlayerNumber());

        // 방의 인원이 0이 되면 방 목록에서 삭제
        if (room.getPlayers().size() == 0) {
          roomRepository.delete(room);
          break;
        }

        selectNewHost(pickUserInfo, system, room);

        headerAccessor.getSessionAttributes().remove("user");
        headerAccessor.getSessionAttributes().remove("room");

        message.setMessage(userInfo.getUser().getNickname() + "님이 퇴장하셨습니다.");
        break;
    }
    operations.convertAndSend("/sub/socket/room/" + room.getId(), message);
  }

  private void selectNewHost(UserInfo userInfo, UserInfo system, GameRoom room) {
    if (userInfo.getUserStatus().equals(ROLE_MANAGER)) {
      for (int i = 1; i <= 8; i++) {
        User nextHost = room.getPlayers().get(i);
        log.info("방장 선발");
        if (nextHost != null) {
          UserInfo userInfo1 = UserInfo.builder()
            .user(nextHost)
            .userStatus(ROLE_MANAGER)
            .build();
          Message nextHostMessage = new Message();
          nextHostMessage.setType(Message.MessageType.ROOM);
          nextHostMessage.setGameRoom(room);
          nextHostMessage.setUserInfo(system);
          nextHostMessage.setMessage(userInfo1.getUser().getNickname() + " 님이 방장이 되셨습니다.");
          operations.convertAndSend("/sub/socket/room/" + room.getId(), nextHostMessage);
          break;
        }
      }
    }
  }
}
