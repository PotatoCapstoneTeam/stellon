package org.gamza.server.Dto.StageDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Dto.UserDto.UserStageDto;
import org.gamza.server.Entity.Stage;

import java.util.List;
import java.util.stream.Collectors;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageRequestDto {
  private String id;
  private List<UserStageDto> userStageDtoList;

  public Stage toEntity() {
    return Stage.builder()
      .id(id)
      .users(userStageDtoList.stream().map(m -> m.getId()).collect(Collectors.toList()))
      .build();
  }
}
