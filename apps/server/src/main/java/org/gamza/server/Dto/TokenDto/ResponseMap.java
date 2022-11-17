package org.gamza.server.Dto.TokenDto;

import java.util.HashMap;
import java.util.Map;

public class ResponseMap extends TokenApiResponse {
  private Map responseData = new HashMap<>();

  public ResponseMap() {
    setResponse(responseData);
  }

  public void setResponseData(String key, Object value) {
    this.responseData.put(key, value);
  }
}
