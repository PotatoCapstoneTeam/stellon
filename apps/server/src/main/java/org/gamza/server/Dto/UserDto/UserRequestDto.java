package org.gamza.server.Dto.UserDto;

import lombok.*;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {
  private String nickname;
}
