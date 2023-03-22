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

  @Column(name = "player_damage")
  private int playerDamage;

  @Column(name = "nexus_damage")
  private int nexusDamage;

  @Column(name = "win_point")
  private int win;

  @Column(name = "lose_point")
  private int lose;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "users")
  private User user;

  @Column(name = "stage_id")
  private String stageId;

  @Column(name = "game_member")
  private int gameMember;
}
