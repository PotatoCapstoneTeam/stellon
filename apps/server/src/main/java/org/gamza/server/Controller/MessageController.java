package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameRoomDto.FindRoomDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.Message;
import org.gamza.server.Entity.User;
import org.gamza.server.Entity.UserInfo;
import org.gamza.server.Enum.RoomType;
import org.gamza.server.Enum.UserStatus;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.RoomEnterException;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.RoomService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

import java.util.Optional;

@Controller
@RequiredArgsConstructor
@Slf4j
public class MessageController {

  private final RoomService roomService;
  private final UserRepository userRepository;
  private final RoomRepository roomRepository;
  private final SimpMessageSendingOperations operations;

  @MessageMapping("/message")
  public void sendMessage(@Payload Message message, SimpMessageHeaderAccessor headerAccessor) {
    UserInfo userInfo = message.getUserInfo();
    FindRoomDto findRoomDto = FindRoomDto.builder()
      .id(message.getGameRoom().getId())
      .roomName(message.getGameRoom().getRoomName())
      .roomStatus(message.getGameRoom().getRoomStatus())
      .build();

    User user = userRepository.findByNickname(userInfo.getUser().getNickname());
    userInfo.setUser(user);
    userInfo.setUserStatus(UserStatus.ROLE_USER);
    GameRoom room = roomService.findRoom(findRoomDto);
    if (room.getRoomType() == RoomType.LOBBY_ROOM) {
      throw new RoomEnterException(ErrorCode.BAD_REQUEST);
    }
    UserInfo system = UserInfo.builder()
      .system("system")
      .build();
    message.setGameRoom(room);

    switch (message.getType()) { // 메시지 타입 검사
      case JOIN: // 방 입장 => 잘 됨
        if(room.getPlayers().size() == room.getRoomSize()) {
          message.setMessage("가득 찬 방입니다.");
          break;
        }
        // 최대 8명 까지 할당 번호 검사하여 없으면 할당
        for (int i = 1; i <= room.getRoomSize(); i++) {
          if (room.getPlayers().isEmpty()) { // 방이 처음 만들어졌을 시 방장 설정
            userInfo.setUserStatus(UserStatus.ROLE_MANAGER);
          }

          if (room.getPlayers().get(i) == null) {
            room.getPlayers().put(i, user);
            userInfo.setPlayerNumber(i);
            headerAccessor.getSessionAttributes().put("userInfo", userInfo);
            headerAccessor.getSessionAttributes().put("roomId", room.getId());
            message.setMessage(userInfo.getUser().getNickname() + "님이 입장하셨습니다.");

            roomRepository.save(room);
            break;
          }
        }
        break;

      case START: // 잘 됨
        if (room.getPlayers().size() % 2 == 1) {
          message.setMessage("인원 수가 맞지 않아 시작할 수 없습니다.");
          break;
        }
        message.setUserInfo(system);
        message.setMessage("곧 게임이 시작됩니다.");
        break;

      case EXIT:
        UserInfo findUserInfo = (UserInfo) headerAccessor.getSessionAttributes().get("userInfo");
        if(!room.getPlayers().isEmpty()) {
          room.getPlayers().remove(findUserInfo.getPlayerNumber());
        }

        message.setMessage(userInfo.getUser().getNickname() + "님이 퇴장하셨습니다.");

        // 방의 인원이 0이 되면 방 목록에서 삭제
        if (room.getPlayers().isEmpty()) {
          headerAccessor.getSessionAttributes().remove("userInfo");
          headerAccessor.getSessionAttributes().remove("roomId");
          room.getPlayers().clear();
          roomRepository.delete(room);
          break;
        }

        // 방장이였다면 방장 재선택
        if(findUserInfo.getUserStatus().equals(UserStatus.ROLE_MANAGER)) {
          selectNewHost(room);
        }
        headerAccessor.getSessionAttributes().remove("userInfo");
        headerAccessor.getSessionAttributes().remove("roomId");
        break;
    }
    operations.convertAndSend("/sub/room/" + room.getId(), message);
  }

  private void selectNewHost(GameRoom room) {
    for (int i = 1; i <= room.getRoomSize(); i++) {
      User nextHost = room.getPlayers().get(i);
      log.info("방장 선발");
      if (nextHost != null) {
        UserInfo hostInfo = UserInfo.builder()
          .user(nextHost)
          .userStatus(UserStatus.ROLE_MANAGER)
          .build();
        Message newHostMsg = Message.builder()
          .type(Message.MessageType.ROOM)
          .gameRoom(room)
          .userInfo(hostInfo)
          .message(hostInfo.getUser().getNickname() + "님이 방장이 되셨습니다.").build();
        operations.convertAndSend("/sub/room/" + room.getId(), newHostMsg);
        break;
      }
    }
  }
}
