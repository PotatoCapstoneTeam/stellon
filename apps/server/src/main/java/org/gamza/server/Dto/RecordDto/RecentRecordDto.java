package org.gamza.server.Dto.RecordDto;

import lombok.Getter;
import org.gamza.server.Entity.RecordResult;

@Getter
public class RecentRecordDto {
  private int gameMember; // 게임 인원 수 ex. 4 vs 4
  private int kill; // 해당 게임 kill 기록
  private int death; // 해당 게임 death 기록
  private int nexusDamage; // 넥서스에 입힌 데미지
  private int playerDamage; // 플레이어에 입힌 데미지
  private boolean isWin; // 승패 여부

  public RecentRecordDto(RecordResult recordResult) {
    this.kill = recordResult.getKill();
    this.death = recordResult.getDeath();
    this.nexusDamage = recordResult.getNexusDamage();
    this.playerDamage = recordResult.getPlayerDamage();
    this.gameMember = recordResult.getGameMember();
    checkWin(recordResult.getWin());
  }

  private void checkWin(int win) {
    if(win == 1) {
      this.isWin = true;
    } else {
      this.isWin = false;
    }
  }
}
