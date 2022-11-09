package org.gamza.server.Service.User;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Entity.User;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.LoginFailedException;
import org.gamza.server.Repository.UserRepository;
import org.gamza.server.Service.AuthService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  public void removeUser(UserLoginDto loginDto) {
    User findUser = userRepository.findByEmail(loginDto.getEmail());
    if (findUser == null) {
      throw new LoginFailedException(ErrorCode.INVALID_USER);
    }
    if (!passwordEncoder.matches(loginDto.getPassword(), findUser.getPassword())) {
      throw new LoginFailedException(ErrorCode.INVALID_USER);
    }
    userRepository.delete(findUser);
  }
}
