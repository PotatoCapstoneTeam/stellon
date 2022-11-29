package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameDto.GameRequestDto;
import org.gamza.server.Dto.GameDto.GameResponseDto;
import org.gamza.server.Entity.RecordResult;
import org.gamza.server.Repository.ResultRepository;
import org.gamza.server.Repository.RoomRepository;
import org.gamza.server.Repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class GameService {
  private final ResultRepository resultRepository;
  private final UserRepository userRepository;
  private final RoomRepository roomRepository;

  @Transactional
  public void gameRequest(GameRequestDto gameRequestDto) {

    Long id = Long.parseLong(gameRequestDto.getId());

    for (RecordResult results : gameRequestDto.getUsers()) {
      RecordResult recordResult = RecordResult.builder()
        .kill(results.getKill())
        .death(results.getDeath())
        .user(userRepository.findById(results.getId()).orElseThrow())
        .gameRoom(roomRepository.findById(id).orElseThrow())
        .build();

      resultRepository.save(recordResult);
    }
  }

  @Transactional
  public List<GameResponseDto> gameResponse(Long id) {
    List<RecordResult> recordResult = resultRepository.findByGameRoomId(id);

    return recordResult.stream().map(GameResponseDto::new).collect(Collectors.toList());
  }
}
