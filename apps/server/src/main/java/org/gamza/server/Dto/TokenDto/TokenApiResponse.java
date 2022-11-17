package org.gamza.server.Dto.TokenDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TokenApiResponse {
  private int code = HttpStatus.OK.value();
  private Object response;
}
