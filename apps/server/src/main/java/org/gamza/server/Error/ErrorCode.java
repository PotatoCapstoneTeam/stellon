package org.gamza.server.Error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@ToString
public enum ErrorCode {
  INVALID_USER(400, HttpStatus.BAD_REQUEST, "아이디 또는 비밀번호가 일치하지 않습니다."),
  DUPLICATE_EMAIL(409, HttpStatus.CONFLICT, "이미 존재하는 이메일입니다."),
  DUPLICATE_NICKNAME(409, HttpStatus.CONFLICT, "이미 존재하는 닉네임입니다."),
  FORBIDDEN_EXCEPTION(403, HttpStatus.FORBIDDEN, "해당 요청에 대한 권한이 없습니다."),
  NON_LOGIN(401, HttpStatus.UNAUTHORIZED, "로그인 후 이용 가능합니다"),
  NOT_EXIST(401, HttpStatus.NOT_FOUND, "존재하지 않는 유저입니다."),
  EXPIRED_TOKEN(444, HttpStatus.UNAUTHORIZED, "만료된 토큰입니다. 토큰 재발급을 진행해주세요."),
  RE_LOGIN(445, HttpStatus.UNAUTHORIZED, "모든 토큰이 만료되었습니다. 다시 로그인해주세요"),
  INVALID_TOKEN(498, HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
  ;

  private int code;
  private HttpStatus status;
  private String message;
}
