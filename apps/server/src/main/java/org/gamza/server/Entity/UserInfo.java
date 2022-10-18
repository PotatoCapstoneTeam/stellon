package org.gamza.server.Entity;

import lombok.Getter;
import lombok.Setter;
import org.gamza.server.Enum.UserStatus;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@Getter
@Setter
public class UserInfo {

  private int playerNumber;   // 방에 들어온 순서 번호
  private String username = "";

  @Enumerated(EnumType.STRING)
  private UserStatus userStatus;  // 방장인지 아닌지 구분
}
