package org.gamza.server.Error.Exception;

import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class LoginFailedException extends RuntimeException {
  private final ErrorCode errorCode;

  public LoginFailedException(ErrorCode errorCode) {
    this.errorCode = errorCode;
  }
}
