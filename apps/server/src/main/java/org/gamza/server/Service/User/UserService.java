package org.gamza.server.Service.User;

import lombok.RequiredArgsConstructor;
import org.gamza.server.Config.JWT.JwtTokenProvider;
import org.gamza.server.Dto.RecordDto.RecentRecordDto;
import org.gamza.server.Dto.UserDto.*;
import org.gamza.server.Entity.RecordResult;
import org.gamza.server.Entity.User;
import org.gamza.server.Enum.PlaneType;
import org.gamza.server.Error.ErrorCode;
import org.gamza.server.Error.Exception.LoginFailedException;
import org.gamza.server.Repository.ResultRepository;
import org.gamza.server.Repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.*;
import java.util.stream.Collectors;

import static org.gamza.server.Enum.TeamStatus.*;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtTokenProvider jwtTokenProvider;
  private final ResultRepository resultRepository;

  @Transactional
  public List<UserResponseDto> findAll() {
    List<User> userList = new ArrayList<>(userRepository.findAll());
    return getUserResponseDtos(userList);
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
  public UserRecordDto getUserRecordByToken(HttpServletRequest request) {
    String token = request.getHeader("Authorization");

    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    return getRecordByUser(findUser);
  }

  @Transactional
  public UserRecordDto getUserRecordByNickname(String nickname) {
    User findUser = userRepository.findByNickname(nickname);
    return getRecordByUser(findUser);
  }

  @Transactional
  public void updatePlane(HttpServletRequest request, PlaneType type) {
    String token = request.getHeader("Authorization");

    User findUser = userRepository.findByEmail(jwtTokenProvider.parseClaims(token).getSubject());
    findUser.updatePlane(type);
  }

  @Transactional
  public void updateReadyStatus(String nickname) {
    User user = userRepository.findByNickname(nickname);
    user.updateReadyStatus();
  }

  @Transactional
  public void updateTeamStatus(String nickname) {
    User user = userRepository.findByNickname(nickname);
    user.updateTeamStatus(user.getTeamStatus() == RED_TEAM ? BLUE_TEAM : RED_TEAM);
  }

  @Transactional
  public void initStatus(String nickname) {
    User user = userRepository.findByNickname(nickname);
    user.initStatus();
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

  @Transactional
  public Map<Integer, AddUserDto> playersToDto(Map<Integer, User> players) {
    Map<Integer, AddUserDto> playersDto = new HashMap<>();
    for(Integer key : players.keySet()) {
      User user = players.get(key);
      AddUserDto userDto = new AddUserDto(user);
      playersDto.put(key, userDto);
    }
    return playersDto;
  }

  private UserRecordDto getRecordByUser(User findUser) {
    List<RecordResult> recordResult = resultRepository.findAllByUser(findUser);

    int win = recordResult.stream().map(r -> r.getWin()).mapToInt(Integer::intValue).sum();
    int lose = recordResult.stream().map(r -> r.getLose()).mapToInt(Integer::intValue).sum();

    List<RecordResult> recentRecord = resultRepository.findTop5ByUserOrderByIdDesc(findUser);
    List<RecentRecordDto> recentRecordDtos = recentRecord.stream().map(RecentRecordDto::new)
      .collect(Collectors.toList());

    return UserRecordDto.builder()
      .nickname(findUser.getNickname())
      .win(win)
      .lose(lose)
      .recordDtos(recentRecordDtos)
      .build();
  }
}
