import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { customColor } from '../constants/customColor';
import GameRoomPage from '../containers/GameRoomPage/GameRoomPage';
import { useCheckRoom } from '../hooks/useCheckRoom';

const GameRoom = () => {
  const { id } = useParams();
  const { check, refetch } = useCheckRoom(id as string);
  const navigate = useNavigate();

  useEffect(() => console.log(check, id), [check, id]);
  useEffect(() => {
    refetch();
  }, [id]);

  if (check === undefined) {
    // check 값이 undefined 일 때 로딩 상태를 보여줄 수 있는 UI 추가
    return <Test>Loading...</Test>;
  }

  if (check === false) {
    navigate('/lobby');
    alert('방에 입장할 수 없습니다.');
  }
  return (
    <>
      {check} && <GameRoomPage />
    </>
  );
};

export default GameRoom;

const Test = styled.div`
  color: ${customColor.white};
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
