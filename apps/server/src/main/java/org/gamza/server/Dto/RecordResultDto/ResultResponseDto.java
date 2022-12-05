package org.gamza.server.Dto.RecordResultDto;

import org.gamza.server.Entity.RecordResult;

public class ResultResponseDto {
  private int kill;
  private int death;

  public ResultResponseDto(RecordResult recordResult) {
    this.kill = recordResult.getKill();
    this.death = recordResult.getDeath();
  }
}
