package org.gamza.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.gamza.server.Enum.Authority;
import org.gamza.server.Enum.PlaneType;
import org.gamza.server.Enum.ReadyStatus;
import org.gamza.server.Enum.TeamStatus;

import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Table(name = "users")
public class User extends BaseTimeEntity {

  @Id
  @GeneratedValue(strategy = IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true)
  private String nickname;

  @Column(nullable = false, unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  private Authority authority;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private TeamStatus teamStatus;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private ReadyStatus readyStatus;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private PlaneType planeType;

  @Column
  private String refreshToken;

  public void updateToken(String newRefreshToken) {
    this.refreshToken = newRefreshToken;
  }

  public void deleteToken() {
    this.refreshToken = null;
  }

  public void updatePlane(PlaneType type) {
    this.planeType = type;
  }

  public void updateTeamStatus(TeamStatus teamStatus) {
    this.teamStatus = teamStatus;
  }

  public void updateReadyStatus(ReadyStatus readyStatus) {
    this.readyStatus = readyStatus;
  }
}
