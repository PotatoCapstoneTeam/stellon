package org.gamza.server.Dto.GameDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageRequestDto {
  private String id;  // stageId
  private List<StageDataDto> users;
}
