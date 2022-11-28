import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import Info from './components/Info';
import GameList from './components/GameList';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { useCookies } from 'react-cookie';
import CreateRoomModal from './modal/CreateRoomModal';
import useLogin from '../../hooks/useLogin';
import useUser from '../../hooks/useUser';
import useRoom from '../../hooks/useRoom';
export interface IInfo {
  nickname: string;
  winRecord: number;
  loseRecord: number;
}

const LobbyPage = () => {
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅
  const [modalOpen, setModalOpen] = useState(false);
  const { loginCheck } = useLogin();
  const { user, register, userInfo } = useUser();
  const { watchRoom, list } = useRoom();

  useEffect(() => {
    (async () => {
      await loginCheck();
      register();
      user();
      watchRoom();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies['user_access_token']]);

  return (
    <div>
      <Space />
      <Container>
        <Header setModalOpen={setModalOpen} />
        <ContentBox>
          <BackgroundBox />
          <Info {...userInfo!} />
          <GameList list={list} />
          <Chat {...userInfo!} />
          <UserList />
        </ContentBox>
      </Container>
      {modalOpen && <CreateRoomModal setModalOpen={setModalOpen} />}
    </div>
  );
};

export default LobbyPage;

const BackgroundBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(198, 198, 198, 1);
  opacity: 0.7;
  border-radius: 10px;
`;

const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 592px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 640px;
`;
