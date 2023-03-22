package org.gamza.server.Repository;

import org.gamza.server.Entity.RecordResult;
import org.gamza.server.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<RecordResult, Long> {
  List<RecordResult> findAllByUser(User user);
  List<RecordResult> findTop5ByUserOrderByIdDesc(User user);
}
