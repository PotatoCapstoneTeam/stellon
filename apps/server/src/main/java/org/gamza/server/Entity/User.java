package org.gamza.server.Entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.gamza.server.Enum.ReadyOrNot;
import org.gamza.server.Enum.TeamStatus;
import org.gamza.server.Enum.UserStatus;

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

  @Column(nullable = false)
  private String nickname;

  @Column(nullable = false)
  private String email;

  @Column(nullable = false)
  private String password;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private UserStatus userStatus;

  @Enumerated(EnumType.STRING)
  @Column
  private ReadyOrNot readyOrNot;

  @Enumerated(EnumType.STRING)
  @Column
  private TeamStatus teamStatus;
  public void update() {

  }
}
