package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.GameRoomDto.FindRoomDto;
import org.gamza.server.Dto.GameRoomDto.RoomCreateDto;
import org.gamza.server.Dto.GameRoomDto.RoomResponseDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.User.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class RoomService {
  private final RoomRepository roomRepository;
  private final UserRepository userRepository;
  private final UserService userService;
  private final JwtTokenProvider jwtTokenProvider;
  private final PasswordEncoder passwordEncoder;

  // 게임 대기방 목록 전체 조회
  public List<RoomResponseDto> findGameRooms() {
    List<GameRoom> list = new ArrayList<>(roomRepository.findGameRoomsByRoomType(RoomType.WAITING_ROOM));
    List<RoomResponseDto> roomList;
    roomList = list.stream().map(RoomResponseDto::new).collect(Collectors.toList());
    Collections.reverse(roomList);
    return roomList;
  }

  public GameRoom findRoom(FindRoomDto findRoomDto) {
    return roomRepository.findById(findRoomDto.getId()).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 방입니다."));
  }

  // 로비 생성
  public GameRoom addLobby() {
    GameRoom lobby = GameRoom.builder()
      .roomName("로비")
      .players(new HashMap<>())
      .roomStatus(RoomStatus.OPEN)
      .roomType(RoomType.LOBBY_ROOM)
      .roomSize(100)
      .build();
    return roomRepository.save(lobby);
  }

  // 방 만들기
  public GameRoom addRoom(RoomCreateDto createDto) {
    GameRoom room;
    if (createDto.getPassword().isEmpty()) {
      room = GameRoom.builder()
        .roomName(createDto.getRoomName())
        .players(new HashMap<>())
        .roomStatus(RoomStatus.OPEN)
        .roomType(RoomType.WAITING_ROOM)
        .roomSize(createDto.getRoomSize())
        .build();
    } else {
      room = GameRoom.builder()
        .roomName(createDto.getRoomName())
        .players(new HashMap<>())
        .roomStatus(RoomStatus.OPEN)
        .roomType(RoomType.WAITING_ROOM)
        .roomSize(createDto.getRoomSize())
        .password(passwordEncoder.encode(createDto.getPassword()))
        .build();
    }
    return roomRepository.save(room);
  }

  // lobby 의 players 조회
  public List<UserResponseDto> getLobbyUsers() {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    List<User> userList = new ArrayList<>(lobby.getPlayers().values());
    return userService.getUserResponseDtos(userList);
  }

  public void addUserToLobby(HttpServletRequest request) {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    String token = request.getHeader("Authorization");
    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    int idx = lobby.getPlayers().size();
    lobby.getPlayers().put(idx + 1, findUser);
    roomRepository.save(lobby);
  }
}
