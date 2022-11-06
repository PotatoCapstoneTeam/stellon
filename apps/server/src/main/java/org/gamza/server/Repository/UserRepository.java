package org.gamza.server.Repository;

import org.gamza.server.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByNickname(String nickname);
  boolean existsByNickname(String nickname);
  User findByEmail(String email);
}
