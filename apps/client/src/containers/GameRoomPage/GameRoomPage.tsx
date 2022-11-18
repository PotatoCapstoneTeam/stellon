import styled from 'styled-components';
import Space from '../../canvas/Space';
import ChatRoom from '../../components/ChatRoom';
import { Map, Title, Info, Client, State } from './components/index';

const GameRoomPage = () => {
  return (
    <div>
      <Space />
      <Container>
        <BackgroundBox />
        <Header>
          <Title />
          <Info />
        </Header>
        <Article>
          <Client />
          <Map />
          <ChatRoom state="chatRoom" />
          <State />
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
  background-color: rgba(198, 198, 198, 1);
  opacity: 0.7;
  border-radius: 10px;
`;
