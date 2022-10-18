package org.gamza.server.Repository;

import org.gamza.server.Entity.RecordResult;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResultRepository extends JpaRepository<RecordResult, Long> {

}
