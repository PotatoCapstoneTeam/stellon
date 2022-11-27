package org.gamza.server.Service.User;

import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.UserDto.UserLoginDto;
import org.gamza.server.Dto.UserDto.UserRecordDto;
import org.gamza.server.Dto.UserDto.UserRequestDto;
import org.gamza.server.Dto.UserDto.UserResponseDto;
import org.gamza.server.Entity.User;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.LoginFailedException;
import org.gamza.server.Error.Exception.NotValidException;
import org.gamza.server.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;

  @Transactional
  public List<UserResponseDto> findAll() {
    List<User> userList = new ArrayList<>(userRepository.findAll());
    return getUserResponseDtos(userList);
  }

  @Transactional
  public User findByNickname(String nickname) {
    return userRepository.findByNickname(nickname);
  }

  @Transactional
  public List<UserResponseDto> getUserResponseDtos(List<User> userList) {
    List<UserResponseDto> allUserNickname = new ArrayList<>();
    for (User user : userList) {
      String nickname = user.getNickname();
      allUserNickname.add(UserResponseDto.builder().nickname(nickname).build());
    }
    Collections.reverse(allUserNickname);
    return allUserNickname;
  }

  @Transactional
  public UserRecordDto getUserRecord(UserRequestDto requestDto) {
    User findUser = userRepository.findByNickname(requestDto.getNickname());
    if(findUser == null) {
      throw new NotValidException(ErrorCode.INVALID_USER);
    }
    UserRecordDto recordDto = UserRecordDto.builder()
      .nickname(findUser.getNickname())
      .winRecord(1)
      .loseRecord(1)
      .build();
    return recordDto;
  }

  @Transactional
  public UserRecordDto getUserRecordByToken(HttpServletRequest request) {
    String token = request.getHeader("Authorization");
    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());

    return UserRecordDto.builder()
      .nickname(findUser.getNickname())
      .winRecord(100)
      .loseRecord(100)
      .build();
  }

  @Transactional
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

  @Transactional
  public void removeAll() {
    userRepository.deleteAll();
  }
}
