package org.gamza.server.Dto.RecordDto;

import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResultRequestDto {
  private Long userId;
  private int kill;
  private int death;
  private int damageDealtToPlayer;
  private int damageDealtToNexus;
}
