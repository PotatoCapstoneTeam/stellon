package org.gamza.server.Error.Exception;

import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class NotValidException extends IllegalStateException {
  private ErrorCode errorCode;

  public NotValidException(ErrorCode errorCode) {
    this.errorCode = errorCode;
  }
}
