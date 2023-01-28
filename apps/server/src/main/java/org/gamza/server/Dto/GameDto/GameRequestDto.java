package org.gamza.server.Dto.GameDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Dto.RecordResultDto.ResultRequestDto;
import org.gamza.server.Enum.TeamStatus;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRequestDto {
//  private Long roomId // roomId 추가
  private String id;  // stageId
  private Long roomId;
  private TeamStatus victoryTeam;
  private List<ResultRequestDto> users;
}
