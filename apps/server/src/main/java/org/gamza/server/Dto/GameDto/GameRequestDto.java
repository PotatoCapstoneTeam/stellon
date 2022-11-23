package org.gamza.server.Dto.GameDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.gamza.server.Entity.RecordResult;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GameRequestDto {
  private String id;
  private List<RecordResult> users;
}
