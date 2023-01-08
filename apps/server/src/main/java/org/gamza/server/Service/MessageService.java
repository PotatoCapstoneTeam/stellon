package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameDto.GameMessageDto;
import org.gamza.server.Dto.GameDto.StageRequestDto;
import org.gamza.server.Dto.MessageDto.MessageRequestDto;
import org.gamza.server.Dto.UserDto.AddUserDto;
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
import org.gamza.server.Service.User.UserService;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
  @Value("${secretKey}")
  private String secretKey;
  @Value("${selfUrl}")
  private String selfUrl;
  @Value("${stageUrl}")
  private String stageUrl;
  private final RoomService roomService;
  private final UserService userService;
  private final RoomRepository roomRepository;
  private Map<Long, String> userMap = new HashMap<>();

  @Transactional
  public void checkRoomType(MessageRequestDto messageDto) {
    GameRoom room = roomService.findRoom(messageDto.getRoomId());

    if (room.getRoomType() == RoomType.LOBBY_ROOM) {
      throw new RoomException(ErrorCode.BAD_REQUEST, "Room Type 이 로비입니다.");
    }
  }

  @Transactional
  public Message joinService(Principal principal, MessageRequestDto messageDto, SimpMessageHeaderAccessor headerAccessor) {
    Message message = getMessage(messageDto);

    GameRoom room = roomService.findRoom(messageDto.getRoomId());
    User user = userService.findByNickname(messageDto.getNickname());

    UserInfo userInfo = UserInfo.builder()
      .user(user)
      .userStatus(UserStatus.ROLE_USER)
      .build();

    List<AddUserDto> players = roomService.getRoomUsers(message.getGameRoom().getId());

    if(players.size() == message.getGameRoom().getRoomSize()) {
      throw new RoomException(ErrorCode.BAD_REQUEST, "방에 입장할 수 없습니다.");
    }

    // 최대 8명 까지 할당 번호 검사하여 없으면 할당
    for (int i = 0; i < message.getGameRoom().getRoomSize(); i++) {
      if (players.isEmpty()) { // 방이 처음 만들어졌을 시 방장 유저 설정
        userInfo.setUserStatus(UserStatus.ROLE_MANAGER);
        userInfo.getUser().updateReadyStatus(ReadyStatus.NOT_READY);
        userInfo.getUser().updateTeamStatus(TeamStatus.RED_TEAM);
        room.getPlayers().put(i, user);
        userInfo.setPlayerNumber(0);
        headerAccessor.getSessionAttributes().put("userInfo", userInfo);
        headerAccessor.getSessionAttributes().put("roomId", room.getId());
        message.setMessage(userInfo.getUser().getNickname() + "님이 입장하셨습니다.");

        roomRepository.save(room);
        break;
      }
      if (!room.getPlayers().containsKey(i)) {
        userInfo.getUser().updateTeamStatus(i % 2 == 0 ? TeamStatus.RED_TEAM : TeamStatus.BLUE_TEAM);
        userInfo.getUser().updateReadyStatus(ReadyStatus.NOT_READY);
        room.getPlayers().put(i, user);
        userInfo.setPlayerNumber(i);
        headerAccessor.getSessionAttributes().put("userInfo", userInfo);
        headerAccessor.getSessionAttributes().put("roomId", room.getId());
        message.setMessage(userInfo.getUser().getNickname() + "님이 입장하셨습니다.");

        roomRepository.save(room);
        break;
      }
    }
    userMap.put(user.getId(), principal.getName());
    return message;
  }

  @Transactional
  public Message checkStart(MessageRequestDto messageDto, SimpMessageHeaderAccessor headerAccessor) {
    Message message = getMessage(messageDto);
//    UserInfo userInfo = (UserInfo) headerAccessor.getSessionAttributes().get("userInfo");
    List<AddUserDto> players = roomService.getRoomUsers(message.getGameRoom().getId());

//    if(userInfo.getUserStatus() != UserStatus.ROLE_MANAGER) {
//      message.setMessage("방장만 시작할 수 있습니다.");
//      return message;
//    }

    // 레드팀 블루팀 인원이 같아야 됨
    if (players.size() % 2 == 1) {
      message.setMessage("인원 수가 맞지 않아 시작할 수 없습니다.");
      return message;
    }

    for (AddUserDto player : players) {
      if (player.getReadyStatus() == ReadyStatus.NOT_READY) {
        message.setMessage("모두가 READY 상태여야 시작할 수 있습니다.");
        break;
      }
    }
    return message;
  }

  @Transactional
  public ResponseEntity<StageRequestDto> startService(MessageRequestDto messageDto) {
    roomService.updateRoomStatus(messageDto.getRoomId());
    Message message = getMessage(messageDto);

    List<AddUserDto> players = roomService.getRoomUsers(message.getGameRoom().getId());

    message.setMessage("곧 게임이 시작됩니다.");

    RestTemplate restTemplate = new RestTemplate(); // 게임 서버 연결 시작

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.APPLICATION_JSON);
    httpHeaders.add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" +
      " AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36");

    String url = stageUrl + "/api";

    JSONObject jsonObject = new JSONObject();

    jsonObject.put("callback", selfUrl + "/game/result/save");
    jsonObject.put("secret", secretKey);

    JSONArray usersJsonArray = new JSONArray();

    for (AddUserDto player : players) {
      JSONObject userJsonObject = new JSONObject();

      userJsonObject.put("id", player.getId());
      userJsonObject.put("nickname", player.getNickname());
      userJsonObject.put("team", player.getTeamStatus().toString());

      usersJsonArray.add(userJsonObject);
    }

    jsonObject.put("users", usersJsonArray);
    HttpEntity<String> request = new HttpEntity<>(jsonObject.toString(), httpHeaders);

    ResponseEntity<StageRequestDto> response = restTemplate.postForEntity(url, request, StageRequestDto.class);

    return response;
  }

  @Transactional
  public Message changeService(MessageRequestDto messageDto) {
    Message message = getMessage(messageDto);

    userService.updateTeamStatus(messageDto.getNickname());
    message.setGameRoom(roomService.roomMessageDto(roomService.findRoom(message.getGameRoom().getId())));

    return message;
  }

  @Transactional
  public Message readyService(MessageRequestDto messageDto) {
    Message message = getMessage(messageDto);

    userService.updateReadyStatus(messageDto.getNickname());
    message.setGameRoom(roomService.roomMessageDto(roomService.findRoom(message.getGameRoom().getId())));

    return message;
  }

  @Transactional
  public String getPrincipal(Long id) {
    return userMap.get(id);
  }

  @Transactional
  public Message disconnect(UserInfo userInfo, Long roomId) {
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

    userMap.remove(user.getId());
    message.setMessage(userInfo.getUser().getNickname() + "님이 퇴장하셨습니다.");
    message.setGameRoom(roomService.roomMessageDto(roomService.findRoom(roomId)));

    // 방이 빈 방이면 방 삭제 후 리턴
    if (roomService.getRoomUsers(roomId).isEmpty()) {
      roomService.removeRoom(roomId);
      message.setMessage("empty");
    }
    return message;
  }

//  @Transactional
//  public Message selectNewHost(Long roomId) {
//    GameRoom room = roomService.findRoom(roomId);
//    Message message = Message.builder().build();
//    for (int i = 0; i <= room.getRoomSize(); i++) {
//      if (room.getPlayers().containsKey(i)) {
//        log.info("방장 선발");
//        User findUser = room.getPlayers().get(i);
//        UserInfo hostInfo = UserInfo.builder()
//          .user(findUser)
//          .userStatus(UserStatus.ROLE_MANAGER)
//          .build();
//        Message newHostMsg = Message.builder()
//          .type(Message.MessageType.ROOM)
//          .gameRoom(roomService.roomMessageDto(room))
//          .userInfo(hostInfo)
//          .message(hostInfo.getUser().getNickname() + "님이 방장이 되셨습니다.").build();
//        message = newHostMsg;
//        break;
//      }
//    }
//    return message;
//  }

  private Message getMessage(MessageRequestDto messageDto) {
    GameRoom room = roomService.findRoom(messageDto.getRoomId());
    GameMessageDto roomDto = roomService.roomMessageDto(room);

    UserInfo system = UserInfo.builder()
      .system("system")
      .build();

    Message message = Message.builder()
      .userInfo(system)
      .type(messageDto.getType())
      .gameRoom(roomDto)
      .build();

    return message;
  }
}
