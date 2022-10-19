package org.gamza.server.Dto.TokenDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TokenInfo {
  private String accessToken;
  private String refreshToken;
}
