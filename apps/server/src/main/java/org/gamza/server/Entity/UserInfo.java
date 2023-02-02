package org.gamza.server.Entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserInfo {

  private User user;

  private int playerNumber;   // 방에 들어온 순서 번호

  private String system;
}
