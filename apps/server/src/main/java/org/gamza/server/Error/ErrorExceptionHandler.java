package org.gamza.server.Error;

import lombok.extern.slf4j.Slf4j;
import org.gamza.server.Error.Exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@ControllerAdvice
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

  @ExceptionHandler(RoomException.class)
  public ResponseEntity<ErrorResponse> handleRoomException(RoomException ex) {
    log.error("handleRoomException", ex);
    ErrorResponse response = new ErrorResponse(ex.getErrorCode().getCode(), ex.getMessage());
    return new ResponseEntity<>(response, ErrorCode.BAD_REQUEST.getStatus());
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<ErrorResponse> handleNotValidException(NotValidException ex) {
    log.error("handleNotValidException", ex);
    ErrorResponse response = new ErrorResponse(ErrorCode.BAD_REQUEST.getCode(), ErrorCode.BAD_REQUEST.getMessage());
    return new ResponseEntity<>(response, ErrorCode.BAD_REQUEST.getStatus());
  }

  @MessageExceptionHandler(RoomException.class)
  public ResponseEntity<ErrorResponse> messageHandleRoomException(RoomException ex) {
    log.error("stomp RoomException", ex);
    ErrorResponse response = new ErrorResponse(ex.getErrorCode().getCode(), ex.getMessage());
    return new ResponseEntity<>(response, ErrorCode.NOT_FOUND.getStatus());
  }
}
