package org.gamza.server.Error.Exception;


import lombok.Getter;
import org.gamza.server.Error.ErrorCode;

@Getter
public class AuthenticationException extends RuntimeException {
  private final ErrorCode errorCode;

  public AuthenticationException(ErrorCode errorCode) {
    this.errorCode = errorCode;
  }
}
