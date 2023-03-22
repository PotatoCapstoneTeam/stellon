package org.gamza.server.Dto.UserDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Dto.RecordDto.RecentRecordDto;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRecordDto {
  private String nickname;
  private int win;
  private int lose;
  private List<RecentRecordDto> recordDtos; // 최근 전적 데이터
}
