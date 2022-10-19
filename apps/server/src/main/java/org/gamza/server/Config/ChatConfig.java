package org.gamza.server.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class ChatConfig implements WebSocketMessageBrokerConfigurer {
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    // ws://localhost:8080/ws-chat
    // 추후에 SockJs 사용시 http 로 연결
    // setAllowedOrigins 는 나중에 변경해야됨 - 보안이슈
    registry.addEndpoint("/ws-chat")
      .setAllowedOrigins("*");
//      .withSockJS(); // Apic 테스트시 작동 안됨
  }

  @Override
  public void configureMessageBroker(MessageBrokerRegistry registry) {
    // client 는 /sub/room/{roomId} 로 구독
    registry.enableSimpleBroker("/sub");
    // /send 로 메시지 전송
    registry.setApplicationDestinationPrefixes("/send");
  }
}
