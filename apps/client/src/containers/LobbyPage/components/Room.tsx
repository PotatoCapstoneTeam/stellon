import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { IRoom } from './GameList';

const Room = ({ id, map, players, roomName, roomSize, roomStatus }: IRoom) => {
  const navigate = useNavigate();
  const moveGameRoom = async () => {
    navigate(`/game_room/${id}`);
  };

  return (
    <Container onClick={moveGameRoom}>
      <RoomName color="black" size="16">
        {roomName}
      </RoomName>
      <People>
        <PeopleImg src="../assets/people.svg" alt="none" />
        <Typography color="blue" size="16">
          {players}/{roomSize}
        </Typography>
      </People>
      <GameMap color="gray" size="12" fontWeight="500">
        {map}
      </GameMap>
    </Container>
  );
};

export default Room;

const PeopleImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
const People = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;
const GameMap = styled(Typography)`
  width: 50%;
  text-align: right;
`;
const RoomName = styled(Typography)`
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 412px;
  height: 72px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 15px;
  margin: 10px 12px;
  border: 4px solid rgba(0, 109, 163, 1);
  &:hover {
    cursor: pointer;
  }
`;
