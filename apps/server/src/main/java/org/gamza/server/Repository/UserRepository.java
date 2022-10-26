package org.gamza.server.Repository;

import org.gamza.server.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
  User findByNickname(String nickname);
  boolean existsByNickname(String nickname);
  Optional<User> findByEmail(String email);
}
