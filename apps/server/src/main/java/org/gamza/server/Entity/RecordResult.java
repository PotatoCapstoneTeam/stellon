package org.gamza.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
public class RecordResult extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(name = "kill_point")
  private int kill;

  @Column(name = "death_point")
  private int death;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "users")
  private User user;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "rooms")
  private GameRoom gameRoom;
}
