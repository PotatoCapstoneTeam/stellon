package org.gamza.server.Dto.GameDto;

import lombok.*;
import org.gamza.server.Dto.RecordDto.ResultRequestDto;
import org.gamza.server.Enum.TeamStatus;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRequestDto {
  private String id;  // stageId
  private Long roomId;
  private TeamStatus victoryTeam;
  private List<ResultRequestDto> users;
}
