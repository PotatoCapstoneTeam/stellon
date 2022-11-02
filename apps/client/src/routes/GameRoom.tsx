import React from 'react';
import styled from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';
import UserCard from '../components/UserCard';

const GameRoom = () => {
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
        <UserBox>
          <BlueTeam>
            {[false, true, false, false].map((e) => (
              <UserCard state={e} />
            ))}
          </BlueTeam>
          <Vs color="white" size="40">
            VS
          </Vs>
          <RedTeam>
            {[true, true, false, true].map((el) => (
              <UserCard state={el} />
            ))}
          </RedTeam>
        </UserBox>
      </Container>
    </div>
  );
};

export default GameRoom;
const Vs = styled(Typography)`
  height: 10%;
  background-color: #606060;
  width: 94%;
  margin: 0 auto;
`;
const BlueTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 45%;
`;
const RedTeam = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  height: 45%;
`;
const UserBox = styled.article`
  width: 80%;
  height: 92%;
  background-color: aliceblue;
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
`;
const HelpImg = styled.img`
  margin-right: 8px;
  width: 24px;
  height: 24px;
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
