package org.gamza.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class Stage {
  @Id
  private String id;

  @ElementCollection(fetch = FetchType.EAGER)
  @Builder.Default
  private List<Object> users = new ArrayList<>();
}
