package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.GameDto.GameMessageDto;
import org.gamza.server.Dto.GameRoomDto.RoomCreateDto;
import org.gamza.server.Dto.GameRoomDto.RoomResponseDto;
import org.gamza.server.Dto.GameRoomDto.RoomValidDto;
import org.gamza.server.Dto.UserDto.AddUserDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Entity.User;
import org.gamza.server.Entity.UserInfo;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.AuthenticationException;
import org.gamza.server.Error.Exception.DuplicateException;
import org.gamza.server.Error.Exception.RoomException;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.User.UserService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

import static org.gamza.server.Enum.RoomStatus.RUNNING;

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
  public List<RoomResponseDto> findGameRooms(String sort, String order) {
    List<GameRoom> list = new ArrayList<>(roomRepository.findGameRoomsByRoomType(RoomType.WAITING_ROOM));
    List<RoomResponseDto> roomList;
    Comparator<GameRoom> roomComparator;
    if (sort.equals("id") && order.equals("asc")) {
      roomComparator = Comparator.comparing(GameRoom::getId, Comparator.naturalOrder());
    } else if (sort.equals("name") && order.equals("asc")) {
      roomComparator = Comparator.comparing(GameRoom::getRoomName, Comparator.naturalOrder());
    } else if (sort.equals("name") && order.equals("desc")) {
      roomComparator = Comparator.comparing(GameRoom::getRoomName, Comparator.reverseOrder());
    } else if (sort.equals("size") && order.equals("asc")) {
      roomComparator = Comparator.comparing(GameRoom::getRoomSize, Comparator.naturalOrder());
    } else if (sort.equals("size") && order.equals("desc")) {
      roomComparator = Comparator.comparing(GameRoom::getRoomSize, Comparator.reverseOrder());
    } else if (sort.equals("password")) {
      roomComparator = Comparator.comparing(GameRoom::isPasswordRoom, Comparator.reverseOrder());
    } else {
      roomComparator = Comparator.comparing(GameRoom::getId, Comparator.reverseOrder());
    }
    roomList = list.stream().sorted(roomComparator).map(RoomResponseDto::new).collect(Collectors.toList());
    return roomList;
  }

  @Transactional
  public GameRoom findRoom(Long id) {
    return roomRepository.findWithPlayersById(id).orElseThrow(() ->
      new RoomException(ErrorCode.NOT_FOUND, "존재하지 않는 방입니다."));
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

  @Transactional
  public void removeRoom(Long id) {
    roomRepository.deleteById(id);
  }

  // lobby 의 players 조회
  @Transactional
  public List<UserResponseDto> getLobbyUsers() {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    List<User> userList = new ArrayList<>(lobby.getPlayers().values());
    return userService.getUserResponseDtos(userList);
  }

  @Transactional
  public List<AddUserDto> getRoomUsers(Long id) {
    GameRoom room = roomRepository.findById(id).orElse(null);
    List<User> userList = new ArrayList<>(room.getPlayers().values());
    return userService.getAddUserDtos(userList);
  }

  @Transactional
  public void addUserToLobby(HttpServletRequest request) {
    GameRoom lobby = roomRepository.findGameRoomByRoomType(RoomType.LOBBY_ROOM);
    String token = request.getHeader("Authorization");
    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    for (int i = 0; i < 100; i++) {
      if (lobby.getPlayers().get(i) == null) {
        try {
          lobby.getPlayers().put(i, findUser);
          break;
        } catch (DataIntegrityViolationException e) {
          throw new DuplicateException(ErrorCode.DUPLICATE_KEY, "player_key 중복 에러입니다. 다시 요청해주세요.");
        }
      }
    }
    roomRepository.save(lobby);
  }

  @Transactional
  public GameRoom removeUserToRoom(Long roomId, UserInfo userInfo) {
    GameRoom room = roomRepository.findWithPlayersById(roomId).orElse(null);
    room.getPlayers().remove(userInfo.getPlayerNumber());
    userService.initStatus(userInfo.getUser().getNickname());
    return room;
  }

  @Transactional
  public void removeUserToLobby(HttpServletRequest request) {
    GameRoom lobby = roomRepository.findWithPlayersByRoomType(RoomType.LOBBY_ROOM);
    String token = request.getHeader("Authorization");
    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    int index = getIndex(lobby.getPlayers(), findUser);
    lobby.getPlayers().remove(index);
  }

  @Transactional
  public Boolean validateRoom(Long roomId) {
    GameRoom room = roomRepository.findById(roomId).orElseThrow(() ->
      new RoomException(ErrorCode.BAD_REQUEST, "존재하지 않는 방입니다."));

    if (room.getPlayers().size() == room.getRoomSize() || room.getRoomStatus() == RUNNING) {
      return false;
    }
    return true;
  }

  @Transactional
  public void validateRoomPass(RoomValidDto roomValidDto) {
    GameRoom room = roomRepository.findById(roomValidDto.getRoomId()).orElseThrow(() ->
      new RoomException(ErrorCode.BAD_REQUEST, "존재하지 않는 방입니다."));

    if (!passwordEncoder.matches(roomValidDto.getPassword(), room.getPassword())) {
      throw new RoomException(ErrorCode.BAD_REQUEST, "비밀번호가 일치하지 않습니다.");
    }
  }

  @Transactional
  public void updateRoomStatus(Long id) {
    GameRoom room = roomRepository.findById(id).orElse(null);
    room.updateStatus(room.getRoomStatus() == RoomStatus.OPEN ? RUNNING : RoomStatus.OPEN);
  }

  @Transactional
  public GameMessageDto roomMessageDto(GameRoom room) {
    Map<Integer, AddUserDto> playersDto = userService.playersToDto(room.getPlayers());
    GameMessageDto roomDto = GameMessageDto.builder()
      .id(room.getId())
      .roomName(room.getRoomName())
      .roomSize(room.getRoomSize())
      .roomStatus(room.getRoomStatus())
      .roomType(room.getRoomType())
      .players(playersDto)
      .build();
    return roomDto;
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
