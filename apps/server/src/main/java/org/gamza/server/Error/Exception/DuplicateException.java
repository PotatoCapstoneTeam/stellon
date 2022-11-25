package org.gamza.server.Error.Exception;

import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class DuplicateException extends RuntimeException {
  private final ErrorCode errorCode;

  public DuplicateException(ErrorCode errorCode) {
    this.errorCode = errorCode;
  }
}
