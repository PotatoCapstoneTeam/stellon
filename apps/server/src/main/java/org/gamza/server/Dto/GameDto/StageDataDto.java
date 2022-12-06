package org.gamza.server.Dto.GameDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StageDataDto {
  private Long id;  // userId
  private String token;
}
