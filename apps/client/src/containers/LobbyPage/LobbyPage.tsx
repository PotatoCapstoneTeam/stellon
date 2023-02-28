import styled from 'styled-components';
import Space from '../../canvas/Space';
import Info from './components/Info';
import GameList from './components/GameList';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { useLobbyData } from '../../hooks/useLobbyData';
export interface IUser {
  nickname: string;
}

const LobbyPage = () => {
  const { list, userList, myInfo, sort, setSort, setOrder, gameRoomRefetch } =
    useLobbyData();

  return (
    <div>
      <Space />
      <Container>
        <Header list={list} />
        <ContentBox>
          <BackgroundBox />
          <Info {...myInfo} />
          <GameList
            list={list}
            sort={sort}
            setSort={setSort}
            setOrder={setOrder}
            gameRoomRefetch={gameRoomRefetch}
          />
          <Chat {...myInfo} />
          <UserList userList={userList} />
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
