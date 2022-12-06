package org.gamza.server.Repository;
import org.gamza.server.Entity.GameRoom;
import org.gamza.server.Enum.RoomType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RoomRepository extends JpaRepository<GameRoom, Long> {
  List<GameRoom> findGameRoomsByRoomType(RoomType roomType);
  GameRoom findGameRoomByRoomType(RoomType roomType);

  @EntityGraph(attributePaths = {"players"})
  Optional<GameRoom> findWithPlayersById(Long id);

  @EntityGraph(attributePaths = {"players"})
  GameRoom findWithPlayersByRoomType(RoomType roomType);
}
