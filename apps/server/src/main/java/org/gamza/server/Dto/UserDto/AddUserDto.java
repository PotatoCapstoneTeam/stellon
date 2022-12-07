package org.gamza.server.Dto.UserDto;

import lombok.Getter;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.ReadyStatus;
import org.gamza.server.Enum.TeamStatus;

@Getter
public class AddUserDto {
  private Long id;
  private String nickname;
  private TeamStatus teamStatus;
  private ReadyStatus readyStatus;

  public AddUserDto(User user) {
    this.id = user.getId();
    this.nickname = user.getNickname();
    this.teamStatus = user.getTeamStatus();
    this.readyStatus = user.getReadyStatus();
  }
}
