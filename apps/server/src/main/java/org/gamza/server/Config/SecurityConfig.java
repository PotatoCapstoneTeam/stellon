package org.gamza.server.Config;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Config.JWT.JwtAuthenticationFilter;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Error.SecurityErrorHandler.AuthenticationEntryPointHandler;
import org.gamza.server.Error.SecurityErrorHandler.WebAccessDeniedHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

  private final JwtTokenProvider jwtTokenProvider;
  private final WebAccessDeniedHandler webAccessDeniedHandler;
  private final AuthenticationEntryPointHandler authenticationEntryPointHandler;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
      .httpBasic().disable()
      .csrf().disable()
      .cors()
      .and()

      .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
      .and()

      .authorizeRequests()
      .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
      .antMatchers("/ws-stomp/**").permitAll()
      .antMatchers("/auth/login", "/auth/join", "/auth/reissue").permitAll()
      .anyRequest().authenticated()
      .and()

      .exceptionHandling()
      .authenticationEntryPoint(authenticationEntryPointHandler)
      .accessDeniedHandler(webAccessDeniedHandler)
      .and()

      .addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration configuration = new CorsConfiguration();

    configuration.setAllowedOriginPatterns(Collections.singletonList("*")); // 모든 Origin에서의 요청을 허용
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")); // 해당 Http Methods를 사용하는 요청을 허용
    configuration.setAllowedHeaders(List.of("authorization", "refreshToken", "content-type", "x-auth-token")); // 해당 헤더를 사용하는 요청을 허용
    configuration.setExposedHeaders(Collections.singletonList("x-auth-token")); // 헤더에 CSRF 토큰이 있는 요청에 대해 모든 응답 헤더를 노출
    configuration.setAllowCredentials(true); // 사용자 자격 증명(쿠키, 인증키) 사용을 허용할 것

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration); // 모든 URL에 대해 위의 설정을 사용해 CORS 처리를 할 것
    return source;
  }
}
