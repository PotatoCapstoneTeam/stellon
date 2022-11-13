package org.gamza.server.Dto.UserDto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class UserResponseDto {
  private String nickname;
}
