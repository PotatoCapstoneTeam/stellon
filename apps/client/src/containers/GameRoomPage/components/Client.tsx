import { IPlayer, IWebSocketData } from '../../../hooks/useRoomWebSocket';
import styled from 'styled-components';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';

interface IClient {
  data: IWebSocketData[];
}

export const Client = ({ data }: IClient) => {
  const [list, setList] = useState<IPlayer[]>([]);

  useEffect(() => {
    if (data.length === 0) return;
    if (!Object.keys(data[data.length - 1]).includes('gameRoom'))
      return console.log('없음');

    setList(Object.values(data[data.length - 1].gameRoom.players));
  }, [data]);

  useEffect(() => {
    console.log('리스트 값', list);
  }, [list]);

  return (
    <UserBox>
      {list &&
        list.map((e: IPlayer, i: number) => (
          <UserCard state={e['readyStatus']} nickname={e['nickname']} key={i} />
        ))}
    </UserBox>
  );
};

export default Client;

const UserBox = styled.div`
  width: 836px;
  height: 380px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  margin: 12px 0;
`;
