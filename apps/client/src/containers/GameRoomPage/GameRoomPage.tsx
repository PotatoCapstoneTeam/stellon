import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import ChatRoom from '../../components/ChatRoom';
import useLogin from '../../hooks/useLogin';
import useUser from '../../hooks/useUser';
import { Map, Title, Info, Client, State } from './components/index';

const GameRoomPage = () => {
  const { id } = useParams();
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅
  const { login } = useLogin();
  const { user, deleteUserList, userInfo } = useUser();

  useEffect(() => {
    (async () => {
      await login();
      await deleteUserList();
      user();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies['user_access_token']]);

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
          <ChatRoom
            state="chatRoom"
            roomId={id}
            nickname={userInfo?.nickname}
          />
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
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: 10px;
  border-radius: 10px;
`;
