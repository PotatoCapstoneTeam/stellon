package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.GameRoomDto.FindRoomDto;
import org.gamza.server.Dto.GameRoomDto.RoomCreateDto;
import org.gamza.server.Dto.GameRoomDto.RoomResponseDto;
import org.gamza.server.Dto.GameRoomDto.RoomValidDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.AuthenticationException;
import org.gamza.server.Error.Exception.RoomException;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.User.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
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
  @Transactional
  public List<RoomResponseDto> findGameRooms() {
    List<GameRoom> list = new ArrayList<>(roomRepository.findGameRoomsByRoomType(RoomType.WAITING_ROOM));
    List<RoomResponseDto> roomList;
    roomList = list.stream().map(RoomResponseDto::new).collect(Collectors.toList());
    Collections.reverse(roomList);
    return roomList;
  }

  @Transactional
  public GameRoom findRoom(Long id) {
    return roomRepository.findById(id).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 방입니다."));
  }


  // 로비 생성
  @Transactional
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
  @Transactional
  public GameRoom addRoom(@Valid RoomCreateDto createDto) {
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
  @Transactional
  public List<UserResponseDto> getLobbyUsers() {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    List<User> userList = new ArrayList<>(lobby.getPlayers().values());
    return userService.getUserResponseDtos(userList);
  }

  @Transactional
  public List<User> getRoomUsers(Long id) {
    GameRoom room = roomRepository.findById(id).orElse(null);
    List<User> userList = new ArrayList<>(room.getPlayers().values());
    return userList;
  }

  @Transactional
  public void addUserToRoom(GameRoom room, int idx, User user) {
    room.getPlayers().put(idx, user);
    roomRepository.save(room);
  }

  @Transactional
  public void addUserToLobby(HttpServletRequest request) {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    String token = request.getHeader("Authorization");
    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    for(int i = 1; i<= 100; i++) {
      if(lobby.getPlayers().get(i) == null) {
        lobby.getPlayers().put(i, findUser);
        break;
      }
    }
    roomRepository.save(lobby);
  }

  @Transactional
  public void removeUserToRoom(GameRoom room, int idx) {
    room.getPlayers().remove(idx);
    roomRepository.save(room);
  }

  @Transactional
  public void removeUserToLobby(HttpServletRequest request) {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    String token = request.getHeader("Authorization");
    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    int index = getIndex(lobby.getPlayers(), findUser);
    lobby.getPlayers().remove(index);
    roomRepository.save(lobby);
  }

  @Transactional
  public void validateRoomPass(RoomValidDto roomValidDto) {
    GameRoom room = roomRepository.findById(roomValidDto.getRoomId())
      .orElseThrow();
    if(!room.getPassword().isBlank()) {
      if(!passwordEncoder.matches(roomValidDto.getPassword(), room.getPassword())) {
        throw new RoomException(ErrorCode.BAD_REQUEST, "비밀번호가 일치하지 않습니다.");
      }
    }
    if(room.getRoomSize() == room.getPlayers().size()) {
      throw new RoomException(ErrorCode.BAD_REQUEST, "가득 찬 방입니다.");
    }
  }

  public static <K, V> K getIndex(Map<K, V> map, V value) {

    for (K key : map.keySet()) {
      if (value.equals(map.get(key))) {
        return key;
      }
    }
    throw new AuthenticationException(ErrorCode.INVALID_USER);
  }
}
