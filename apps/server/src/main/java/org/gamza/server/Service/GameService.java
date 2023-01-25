package org.gamza.server.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Dto.GameDto.GameRequestDto;
import org.gamza.server.Dto.RecordResultDto.ResultRequestDto;
import org.gamza.server.Entity.RecordResult;
import org.gamza.server.Entity.User;
import org.gamza.server.Repository.ResultRepository;
import org.gamza.server.Repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@RequiredArgsConstructor
@Transactional
@Service
@Slf4j
public class GameService {
  private final ResultRepository resultRepository;
  private final UserRepository userRepository;

  @Transactional
  public void gameResultSave(GameRequestDto gameRequestDto) {
    for (ResultRequestDto requestDto : gameRequestDto.getUsers()) {
      User user = userRepository.findById(requestDto.getUserId()).orElseThrow();
      RecordResult recordResult = RecordResult.builder()
        .kill(requestDto.getKill())
        .death(requestDto.getDeath())
        .user(user)
        .stageId(gameRequestDto.getId())
        .build();

      resultRepository.save(recordResult);
    }
  }
}
