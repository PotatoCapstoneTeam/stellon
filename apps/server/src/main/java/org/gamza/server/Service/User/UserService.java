package org.gamza.server.Service.User;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.UserDto.*;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.ReadyStatus;
import org.gamza.server.Enum.TeamStatus;
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
import java.util.stream.Collectors;

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
  public User findUserByDto(AddUserDto userDto) {
    return userRepository.findById(userDto.getId()).get();
  }

  @Transactional
  public List<AddUserDto> getAddUserDtos(List<User> userList) {
    List<AddUserDto> dtoList = userList.stream().map(AddUserDto::new).collect(Collectors.toList());
    return dtoList;
  }

  @Transactional
  public User findByNickname(String nickname) {
    return userRepository.findByNickname(nickname);
  }

  @Transactional
  public List<UserResponseDto> getUserResponseDtos(List<User> userList) {
    List<UserResponseDto> allUserNickname = userList.stream().map(User::getNickname)
      .map(nickname -> UserResponseDto.builder().nickname(nickname).build()).collect(Collectors.toList());
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
  public void updateReadyStatus(String nickname) {
    User user = userRepository.findByNickname(nickname);
    user.updateReadyStatus(user.getReadyStatus() == ReadyStatus.NOT_READY ? ReadyStatus.READY : ReadyStatus.NOT_READY);
  }

  @Transactional
  public void updateTeamStatus(String nickname) {
    User user = userRepository.findByNickname(nickname);
    user.updateTeamStatus(user.getTeamStatus() == TeamStatus.RED_TEAM ? TeamStatus.BLUE_TEAM : TeamStatus.RED_TEAM);
  }

  @Transactional
  public void initStatus(String nickname) {
    User user = userRepository.findByNickname(nickname);
    user.updateTeamStatus(TeamStatus.NONE);
    user.updateReadyStatus(ReadyStatus.NONE);
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
