package org.gamza.server.Config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
      .allowedOrigins("http://localhost:4200", "http://localhost:3000")
      .allowCredentials(true)
      .exposedHeaders("Authorization", "RefreshToken")
      .allowedHeaders("*")
      .allowedMethods("*");
  }
}
