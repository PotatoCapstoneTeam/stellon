package org.gamza.server.Dto.RecordResultDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultRequestDto {
  private Long userId;
  private int kill;
  private int death;
}
