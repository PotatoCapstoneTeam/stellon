import GameRoomPage from '../containers/GameRoomPage/GameRoomPage';
import { useGameRoomData } from '../hooks/useGameRoomData';

const GameRoom = () => {
  const { deleteUserList, myInfo } = useGameRoomData();

  return myInfo ? (
    <GameRoomPage myInfo={myInfo} deleteUserList={deleteUserList} />
  ) : (
    <div />
  );
};

export default GameRoom;
