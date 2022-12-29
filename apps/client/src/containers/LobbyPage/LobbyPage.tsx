import { useEffect } from 'react';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import Info from './components/Info';
import GameList from './components/GameList';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { axiosPrivate } from '../../util/axios';
import { useLobbyData } from '../../hooks/useLobbyData';
export interface IInfo {
  nickname: string;
  winRecord: number;
  loseRecord: number;
}
export interface IUser {
  nickname: string;
}

const LobbyPage = () => {
  const { list, userList, myInfo, loginCheck, enterUserList } = useLobbyData();

  const exitScreen = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    // 창을 나갈 때 delete요청
    axiosPrivate.delete('/room/lobby/users');
    e.returnValue = '';
  };

  useEffect(() => {
    (async () => {
      window.addEventListener('unload', exitScreen);
      loginCheck.mutate();
      enterUserList.mutate();

      return () => {
        window.removeEventListener('unload', exitScreen);
      };
    })();
  }, []);

  return (
    <div>
      <Space />
      <Container>
        <Header />
        <ContentBox>
          <BackgroundBox />
          <Info {...myInfo!} />
          <GameList list={list || []} />
          <Chat {...myInfo!} />
          <UserList userList={userList || []} />
        </ContentBox>
      </Container>
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
