package org.gamza.server.Error.Exception;

import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class RoomException extends RuntimeException {
  private final ErrorCode errorCode;
  private final String message;
  public RoomException(ErrorCode errorCode, String message) {
    this.errorCode = errorCode;
    this.message = message;
  }
}
