import { IPlayer, IWebSocketData } from '../../../hooks/useRoomWebSocket';
import styled from 'styled-components';
import UserCard from './UserCard';
import { useEffect, useState } from 'react';

interface IClient {
  data: IWebSocketData[];
}

export const Client = ({ data }: IClient) => {
  const [list, setList] = useState<any>([]);
  useEffect(
    () =>
      data[data.length - 1]?.gameRoom.players
        ? setList(data[data.length - 1]?.gameRoom.players)
        : setList((prev: any) => prev),
    [data]
  );

  return (
    <UserBox>
      {list &&
        Object.values(list).map((e: any, i: any) => (
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
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;
