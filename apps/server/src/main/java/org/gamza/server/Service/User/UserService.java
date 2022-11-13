package org.gamza.server.Service.User;

import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.User;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.LoginFailedException;
import org.gamza.server.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public List<UserResponseDto> findAll() {
    List<User> userList = new ArrayList<>(userRepository.findAll());
    return getUserResponseDtos(userList);
  }

  @NotNull
  public List<UserResponseDto> getUserResponseDtos(List<User> userList) {
    List<UserResponseDto> allUserNickname = new ArrayList<>();
    for (User user : userList) {
      String nickname = user.getNickname();
      allUserNickname.add(UserResponseDto.builder().nickname(nickname).build());
    }
    Collections.reverse(allUserNickname);
    return allUserNickname;
  }

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

  public void removeAll() {
    userRepository.deleteAll();
  }
}
