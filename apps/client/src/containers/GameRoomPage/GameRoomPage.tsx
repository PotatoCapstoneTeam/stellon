import axios from '../../util/axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import ChatRoom from '../../components/ChatRoom';
import useRoomWebSocket from '../../hooks/useRoomWebSocket';
import { Map, Title, Info, Client, State } from './components/index';

interface IInfo {
  nickname: string;
  winRecord: number;
  loseRecord: number;
}

const GameRoomPage = () => {
  const { id } = useParams();
  const { send } = useRoomWebSocket(id as string);
  const [myInfo, setMyInfo] = useState<IInfo>();

  const join = () => {
    console.log('방에 입장합니다.');
    send({
      type: 'JOIN',
      roomId: 7,
      nickname: 'testUser',
    });
  };

  useEffect(() => {
    (async () => {
      await axios.delete('/room/lobby/users');
      const myInfo = await axios.get('/user');
      setMyInfo(myInfo.data);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Space />
      <Container>
        <BackgroundBox
          onClick={() => {
            join();
          }}
        />
        <Header>
          <Title />
          <Info />
        </Header>
        <Article>
          <Client />
          <Map />
          <ChatRoom state="chatRoom" roomId={id} nickname={myInfo?.nickname} />
          <State send={send} />
        </Article>
      </Container>
    </div>
  );
};

export default GameRoomPage;

const Article = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Header = styled.header`
  width: 100%;
  padding: 0 5px;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 99;
  position: relative;
  border-bottom: 2px solid black;
`;
const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  padding: 0 16px;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 640px;
`;
const BackgroundBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: 10px;
  border-radius: 10px;
`;
