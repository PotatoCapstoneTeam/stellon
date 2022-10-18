package org.gamza.server.Repository;
import org.gamza.server.Entity.GameRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<GameRoom, Long> {

}
