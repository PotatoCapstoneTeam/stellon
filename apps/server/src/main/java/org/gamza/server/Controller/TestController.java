package org.gamza.server.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
  @PostMapping("/")
  public ResponseEntity<String> test() {
    return ResponseEntity.ok("test token");
  }
}
