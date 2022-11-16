import React from 'react';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import UserCard from './components/UserCard';
import { Typography } from '../../components/Typography';
import ChatRoom from '../../components/ChatRoom';
import { customColor } from '../../constants/customColor';

const GameRoomPage = () => {
  return (
    <div>
      <Space />
      <Container>
        <BackgroundBox />
        <Header>
          <Theme>
            <RoomNumber size="16" color="black" fontWeight="900">
              156번 방
            </RoomNumber>
            <RoomName size="16" color="black" fontWeight="900">
              임송재님의 게임방
            </RoomName>
          </Theme>
          <InfoRoom>
            <People>
              <PeopleImg src="../assets/GameRoomPeople.png"></PeopleImg>
              <NumberOfPeople size="16" color="black" fontWeight="900">
                6/6
              </NumberOfPeople>
            </People>
            <Tools>
              <SettingImg src="../assets/GameRoomSetting.png"></SettingImg>
              <HelpImg src="../assets/GameRoomHelper.png"></HelpImg>
            </Tools>
          </InfoRoom>
        </Header>
        <Article>
          <UserBox>
            {[false, true, false, false, true, true, false, false].map(
              (e, i) => (
                <UserCard state={e} key={i} />
              )
            )}
          </UserBox>
          <Map>
            <MapImg src="../assets/map.png" alt="none"></MapImg>
            <MapName color="black" size="16" fontWeight="900">
              파이썬
            </MapName>
          </Map>
          <ChatRoom state="chatRoom" />
          <StateBox>
            <Ready color="black" size="24" fontWeight="900">
              준비
            </Ready>
            <OutBox>
              <Out src="../assets/logout.png" alt="none"></Out>
            </OutBox>
          </StateBox>
        </Article>
      </Container>
    </div>
  );
};

export default GameRoomPage;

const MapImg = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 15px;
`;
const MapName = styled(Typography)`
  margin-top: 12px;
`;

const OutBox = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: ${customColor.white};
  &:hover {
    cursor: pointer;
  }
`;
const StateBox = styled.div`
  z-index: 99;
  display: flex;
  align-items: end;
  width: 312px;
  justify-content: space-between;
`;
const Ready = styled(Typography)`
  background-color: ${customColor.white};
  padding: 5px 15px;
  padding: 20px 88px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Out = styled.img`
  width: 24px;
  height: 24px;
`;

const Article = styled.article`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const Map = styled.div`
  z-index: 99;
  width: 312px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserBox = styled.div`
  width: 836px;
  height: 380px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;
const NumberOfPeople = styled(Typography)``;
const PeopleImg = styled.img`
  margin-right: 8px;
  width: 20px;
  height: 20px;
`;
const SettingImg = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
  &:hover {
    cursor: pointer;
  }
`;
const HelpImg = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
  }
`;
const Tools = styled.div`
  display: flex;
  margin-left: 16px;
`;
const People = styled.div`
  display: flex;
  padding: 4px 16px 4px 0;
  border-right: 2px solid black;
  align-items: center;
`;
const InfoRoom = styled.div`
  display: flex;
  z-index: 99;
  align-items: center;
`;
const RoomName = styled(Typography)`
  padding-left: 28px;
`;
const RoomNumber = styled(Typography)`
  border-right: 2px solid black;
  padding: 4px 28px;
`;
const Theme = styled.div`
  display: flex;
  z-index: 99;
  align-items: center;
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
