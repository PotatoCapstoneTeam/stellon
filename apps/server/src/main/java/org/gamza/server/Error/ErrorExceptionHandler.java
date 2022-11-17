package org.gamza.server.Error;

import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Error.Exception.AuthenticationException;
import org.gamza.server.Error.Exception.DuplicateException;
import org.gamza.server.Error.Exception.LoginFailedException;
import org.gamza.server.Error.Exception.RoomEnterException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ErrorExceptionHandler {

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex) {
    log.error("handleAuthenticationException", ex);
    ErrorResponse response = new ErrorResponse(ErrorCode.NOT_EXIST.getCode(), ErrorCode.NOT_EXIST.getMessage());
    return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(DuplicateException.class)
  public ResponseEntity<ErrorResponse> handleDuplicateException(DuplicateException ex) {
    log.error("handleDuplicateException", ex);
    ErrorResponse response = new ErrorResponse(ex.getErrorCode().getCode(), ex.getErrorCode().getMessage());
    return new ResponseEntity<>(response, ex.getErrorCode().getStatus());
  }

  @ExceptionHandler(LoginFailedException.class)
  public ResponseEntity<ErrorResponse> handleLoginFailedException(LoginFailedException ex) {
    log.error("handleLoginFailedException", ex);
    ErrorResponse response = new ErrorResponse(ErrorCode.INVALID_USER.getCode(), ErrorCode.INVALID_USER.getMessage());
    return new ResponseEntity<>(response, ErrorCode.INVALID_USER.getStatus());
  }

  @ExceptionHandler(RoomEnterException.class)
  public ResponseEntity<ErrorResponse> handleRoomEnterException(RoomEnterException ex) {
    log.error("handleRoomEnterException", ex);
    ErrorResponse response = new ErrorResponse(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
    return new ResponseEntity<>(response, ErrorCode.BAD_REQUEST.getStatus());
  }

}
