package org.gamza.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.TeamStatus;

import javax.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "GameRooms")
public class GameRoom extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String roomName;

  @OneToMany(fetch=FetchType.EAGER)
  private List<User> players = new ArrayList<>();

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomStatus roomStatus;

  @Column(nullable = false)
  private TeamStatus victoryTeam;

  @Column
  private LocalDateTime endTime;

  public void update() {

  }
}
