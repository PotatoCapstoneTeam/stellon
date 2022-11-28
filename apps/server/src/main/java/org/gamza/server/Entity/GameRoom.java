package org.gamza.server.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.gamza.server.Enum.RoomStatus;
import org.gamza.server.Enum.RoomType;

import javax.persistence.*;

import java.util.HashMap;
import java.util.Map;

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

  @OneToMany(cascade = CascadeType.ALL)
  @JsonIgnore
  private Map<Integer, User> players;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomStatus roomStatus;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomType roomType;

  @Column
  private int roomSize;

  @Column
  private String password;
}
