package org.gamza.server.Service.User;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Entity.CustomUserDetails;
import org.gamza.server.Entity.User;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.AuthenticationException;
import org.gamza.server.Repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User findUser = userRepository.findByEmail(email);

    if (findUser == null) {
      throw new AuthenticationException(ErrorCode.NOT_EXIST);
    }
    return new CustomUserDetails(findUser);
  }
}
