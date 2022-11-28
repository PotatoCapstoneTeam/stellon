package org.gamza.server.Repository;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Enum.RoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<GameRoom, Long> {
  List<GameRoom> findGameRoomsByRoomType(RoomType roomType);
  GameRoom findGameRoomByRoomType(RoomType roomType);
  @Query("select distinct r From GameRoom r join fetch r.players")
  GameRoom findGameRoomById(Long id);
}
