package org.gamza.server.Error;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ErrorResponse {
  private int code;
  private Object error;
}
