package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameRoomDto.FindRoomDto;
import org.gamza.server.Dto.GameRoomDto.RoomRequestDto;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Repository.RoomRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class RoomService {
  private final RoomRepository roomRepository;
  private final PasswordEncoder passwordEncoder;

  // 방 만들기
  public GameRoom addRoom(RoomRequestDto requestDto) {

    if (requestDto.getPassword().isEmpty()) {
      return requestDto.toEntity();
    } else {
      GameRoom room = GameRoom.builder()
        .roomName(requestDto.getRoomName())
        .players(requestDto.getPlayers())
        .roomStatus(requestDto.getRoomStatus())
        .password(passwordEncoder.encode(requestDto.getPassword()))
        .build();

      return roomRepository.save(room);
    }
  }

  // 전체 방 목록 조회
  public List<GameRoom> findRooms() {
    List<GameRoom> list = new ArrayList<>(roomRepository.findAll());
    Collections.reverse(list);
    return list;
  }

  public GameRoom findRoom(FindRoomDto findRoomDto) {
    return roomRepository.findById(findRoomDto.getId()).orElseThrow(() ->
      new ResponseStatusException(HttpStatus.NOT_FOUND, "존재하지 않는 방입니다."));
  }
}
