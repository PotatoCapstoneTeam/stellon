import styled from 'styled-components';
import Space from '../../canvas/Space';
import Info from './components/Info';
import GameList from './components/GameList';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import AudioPlayer from 'react-audio-player';
import { useLobbyData } from '../../hooks/useLobbyData';
import { useState } from 'react';
export interface IUser {
  nickname: string;
}

const LobbyPage = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const { list, userList, myInfo, sort, setSort, setOrder, gameRoomRefetch } =
    useLobbyData();
  const handleMusic = () => {
    setIsPlaying((prev) => !prev);
  };
  return (
    <div>
      {isPlaying && (
        <AudioPlayer src="../assets/audio/music.mp3" autoPlay={true} />
      )}
      <Space />
      <Container>
        <Header list={list} handleMusic={handleMusic} isPlaying={isPlaying} />
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
