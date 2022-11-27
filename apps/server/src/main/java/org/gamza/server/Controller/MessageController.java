package org.gamza.server.Controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.MessageDto.MessageRequestDto;
import org.gamza.server.Dto.StageDto.StageRequestDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.Message;
import org.gamza.server.Entity.User;
import org.gamza.server.Entity.UserInfo;
import org.gamza.server.Enum.ReadyStatus;
import org.gamza.server.Enum.RoomType;
import org.gamza.server.Enum.TeamStatus;
import org.gamza.server.Enum.UserStatus;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.RoomException;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.RoomService;
import org.json.simple.JSONArray;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.Objects;
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
  public void sendMessage(@Payload MessageRequestDto messageDto, SimpMessageHeaderAccessor headerAccessor) {
    User user = userRepository.findByNickname(messageDto.getNickname());
    GameRoom room = roomService.findRoom(messageDto.getRoomId());
    Map<Integer, User> players = roomService.getRoomUsers(room.getId());

    UserInfo system = UserInfo.builder()
      .system("system")
      .build();

    Message message = Message.builder()
      .type(messageDto.getType())
      .build();

    UserInfo userInfo = message.getUserInfo();

    userInfo.setUser(user);
    userInfo.setUserStatus(UserStatus.ROLE_USER);

    message.setUserInfo(userInfo);
    message.setGameRoom(room);

    if (room.getRoomType() == RoomType.LOBBY_ROOM) {
      throw new RoomException(ErrorCode.BAD_REQUEST, "Room Type 이 로비입니다.");
    }

    switch (messageDto.getType()) { // 메시지 타입 검사
      case JOIN:
        // 최대 8명 까지 할당 번호 검사하여 없으면 할당
        for (int i = 1; i <= room.getRoomSize(); i++) {
          if (players.isEmpty()) { // 방이 처음 만들어졌을 시 방장 설정
            userInfo.setUserStatus(UserStatus.ROLE_MANAGER);
          }

          if (players.get(i) == null) {
            userInfo.getUser().updateTeamStatus(i % 2 == 0 ? TeamStatus.BLUE_TEAM : TeamStatus.RED_TEAM);
            userInfo.getUser().updateReadyStatus(ReadyStatus.NOT_READY);
            room.addPlayer(i, user);
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
        boolean isNotReady = false;

        message.setUserInfo(system);

        if (players.size() % 2 == 1) {
          message.setMessage("인원 수가 맞지 않아 시작할 수 없습니다.");
          break;
        }

        for (int i = 1; i <= players.size(); i++) {
          if(players.get(i).getReadyStatus() == ReadyStatus.NOT_READY) {
            message.setMessage("모두가 READY 상태여야 시작할 수 있습니다.");
            isNotReady = true;
            break;
          }
        }

        if(isNotReady) break;

        message.setMessage("곧 게임이 시작됩니다.");

        RestTemplate restTemplate = new RestTemplate(); // 게임 서버 연결 시작

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setContentType(MediaType.APPLICATION_JSON);

        String url = "https://game.stellon.io/api";
        MultiValueMap<String, Object> response = new LinkedMultiValueMap<>();

        response.add("id", room.getId().toString());

        for (int i = 1; i <= players.size(); i++) {
          JSONArray req_array = new JSONArray();

          req_array.add(players.get(i).getId());
          req_array.add(players.get(i).getNickname());
          req_array.add(players.get(i).getTeamStatus());

          response.add("users", req_array);
        }

        response.add("callback", "https://game.stellon.io/api");
        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(response, httpHeaders);

        restTemplate.postForEntity(url, request, String.class); // post 전송

        ResponseEntity<StageRequestDto> responseEntity = restTemplate.getForEntity(url, StageRequestDto.class);

        StageRequestDto stageRequestDto = responseEntity.getBody();
        stageRequestDto.toEntity();

        break;

      case CHANGE:
        userInfo.getUser().updateTeamStatus(userInfo.getUser().getTeamStatus() == TeamStatus.RED_TEAM ? TeamStatus.BLUE_TEAM : TeamStatus.RED_TEAM);
        break;

      case READY:
        userInfo.getUser().updateReadyStatus(userInfo.getUser().getReadyStatus() == ReadyStatus.NOT_READY ? ReadyStatus.READY : ReadyStatus.NOT_READY);
    }
    operations.convertAndSend("/sub/room/" + room.getId(), message);
  }

  @EventListener
  public void webSocketDisconnectListener(SessionDisconnectEvent event) {
    StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());

    // 유저인포와 방 id 가져오기
    UserInfo userInfo = (UserInfo) Objects.requireNonNull(accessor.getSessionAttributes()).get("userInfo");
    Long roomId = (Long) accessor.getSessionAttributes().get("roomId");

    // 유저 찾기
    User user = userRepository.findByNickname(userInfo.getUser().getNickname());

    // 방 찾기
    Optional<GameRoom> room = roomRepository.findById(roomId);
    if(room.isEmpty()) {
      throw new RoomException(ErrorCode.BAD_REQUEST, "잘못된 방 ID 값입니다.");
    }

    // 메시지 생성
    Message message = Message.builder()
      .type(Message.MessageType.EXIT)
      .userInfo(UserInfo.builder().system("system").build())
      .gameRoom(room.get())
      .build();

    // 방에서 해당 유저 삭제
    room.get().removePlayer(userInfo.getPlayerNumber());
    // 유저 정보 수정
    user.updateTeamStatus(TeamStatus.NONE);
    user.updateReadyStatus(ReadyStatus.NONE);

    message.setMessage(userInfo.getUser().getNickname() + "님이 퇴장하셨습니다.");

    // 방이 빈 방이면 방 삭제 후 리턴
    if (roomService.getRoomUsers(roomId).isEmpty()) {
      roomRepository.delete(room.get());
      return;
    }

    // 나간 애가 방장이면 방장 새로 선출
    if(userInfo.getUserStatus().equals(UserStatus.ROLE_MANAGER)) {
      selectNewHost(room.get());
    }

    operations.convertAndSend("/sub/room/" + room.get().getId(), message);
  }

  private void selectNewHost(GameRoom room) {
    for (int i = 1; i <= room.getRoomSize(); i++) {
      User nextHost = roomService.getRoomUsers(room.getId()).get(i);
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
