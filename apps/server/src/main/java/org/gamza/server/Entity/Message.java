package org.gamza.server.Entity;

import lombok.Getter;
import lombok.Setter;

  @Getter
  @Setter
  public class Message {

    // 메시지 타입: 입장, 대기방, 인 게임, 퇴장
    public enum MessageType {
      JOIN, ROOM, START, PLAY, EXIT
    }

    private MessageType type;   // 메시지 타입
    private UserInfo userInfo;
    private String message;
    private GameRoom gameRoom;
  }
