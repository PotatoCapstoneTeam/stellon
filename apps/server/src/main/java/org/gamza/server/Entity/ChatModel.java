package org.gamza.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

// 채팅은 entity 로 만들지 않고 model 객체로만 구현
// -> 채팅 내역 하나하나 저장할 예정 없음
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatModel {
  private Long roomId;
  private User user;
  private String message;
}

