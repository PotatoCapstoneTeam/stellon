package org.gamza.server.Dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserJoinDto {
  @NotBlank(message = "이메일을 입력해주세요")
  @Email(message = "이메일 형식으로 입력해주세요")
  private String email;
  @NotBlank(message = "비밀번호는 최소 6자리 이상으로 입력해주세요")
  @Size(min = 6)
  private String password;
  @NotBlank(message = "닉네임을 입력해주세요")
  @Pattern(regexp = "^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]{2,8}$", message = "닉네임은 특수문자 제외한 2~8자리만 가능합니다")
  private String nickname;
}
