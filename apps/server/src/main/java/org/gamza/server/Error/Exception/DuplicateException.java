package org.gamza.server.Error.Exception;

import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class DuplicateException extends RuntimeException {
  private final ErrorCode errorCode;
  private final String message;

  public DuplicateException(ErrorCode errorCode, String message) {
    this.errorCode = errorCode;
    this.message = message;
  }
}
