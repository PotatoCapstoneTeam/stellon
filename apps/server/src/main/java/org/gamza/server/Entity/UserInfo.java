package org.gamza.server.Entity;

import lombok.*;
import org.gamza.server.Enum.UserStatus;

@Getter
@Setter
@Builder
public class UserInfo {

  private User user;

  private int playerNumber;   // 방에 들어온 순서 번호

  private UserStatus userStatus;  // 방장인지 아닌지 구분

  private String system;
}
