package org.gamza.server.Error.SecurityErrorHandler;

import org.gamza.server.Error.ErrorCode;
import org.json.simple.JSONObject;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthenticationEntryPointHandler implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
    String exception = null;
    ErrorCode errorCode;

    if (request.getAttribute("exception") != null) {
      exception = request.getAttribute("exception").toString();
    }

    // 토큰이 없을 때 예외 처리
    if (exception == null) {
      errorCode = ErrorCode.NON_LOGIN;
      setResponse(response, errorCode);
    }
    // 토큰 만료 시 예외 처리
    else if (exception.equals(ErrorCode.EXPIRED_TOKEN.toString())) {
      errorCode = ErrorCode.EXPIRED_TOKEN;
      setResponse(response, errorCode);
    }
    // 토큰 유효하지 않은 토큰 예외 처리
    else if (exception.equals(ErrorCode.INVALID_TOKEN.toString())) {
      errorCode = ErrorCode.INVALID_TOKEN;
      setResponse(response, errorCode);
    }
  }

  private void setResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
    JSONObject json = new JSONObject();
    response.setContentType("application/json;charset=UTF-8");
    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);

    json.put("code", errorCode.getCode());
    json.put("message", errorCode.getMessage());
    response.getWriter().print(json);
  }
}
