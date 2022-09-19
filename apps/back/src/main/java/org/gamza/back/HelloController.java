package org.gamza.back;

import org.gamza.gameserver.HelloService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
  HelloService helloService;

  @GetMapping("/")
  public String greeting() {
    return "Hello World!";
  }
}
