package org.gamza.server.Error.Exception;

import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class RoomEnterException extends RuntimeException {
  private ErrorCode errorCode;

  public RoomEnterException(ErrorCode errorCode) {
    this.errorCode = errorCode;
  }
}
