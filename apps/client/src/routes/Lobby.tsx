import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';
import { customColor } from '../constants/customColor';
import { useCookies } from 'react-cookie';
import Room from '../components/Room';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatRoom from '../components/ChatRoom';

const Lobby = () => {
  const navigate = useNavigate();
  const [chat, setChat] = useState('');
  const [cookies, removeCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]); // 쿠키 훅

  const loginCheck = () => {
    const accessToken = cookies.user_access_token;
    const refreshToken = cookies.user_refresh_token;

    axios
      .post('url', { token: accessToken }) // 토큰으로 서버에 인증요청
      .then((res) => console.log(res.data))
      .catch(() => logOut());
  };

  const logOut = () => {
    removeCookie('user_access_token', []);
    removeCookie('user_refresh_token', []);
    navigate('/');
  };

  // useEffect(() => {
  //   loginCheck();
  // }, []);

  return (
    <div>
      <Space />
      <Container>
        <Header>
          <Tools>
            <SettingBtn src="../assets/setting.png" alt="none"></SettingBtn>
            <HelperBtn src="../assets/help.png" alt="none"></HelperBtn>
          </Tools>
          <Menu>
            <SearchRoomBtn>
              <SearchImg src="../assets/list.png" alt="none" />
              <Typography color="white" size="16">
                방 목록 보기
              </Typography>
            </SearchRoomBtn>
            <MakeRoomBtn>
              <SearchImg src="../assets/home.png" alt="none" />
              <Typography color="white" size="16">
                방 만들기
              </Typography>
            </MakeRoomBtn>
            <GameStartBtn>
              <SearchImg src="../assets/direction.png" alt="none" />
              <Typography color="white" size="16">
                빠른 시작
              </Typography>
            </GameStartBtn>
          </Menu>
        </Header>
        <ContentBox>
          <BackgroundBox />
          <InfoBox>
            <InfoHeader>
              <InfoAirplane src="../assets/InfoAirplane.png" alt="none" />
              <Typography color="black" size="16">
                내 정보
              </Typography>
            </InfoHeader>
            <AirplaneBox>
              <UserAirplane src="../assets/userAirplane.png" alt="none" />
            </AirplaneBox>
            <NickName>
              <Typography color="black" size="16" fontWeight="900">
                임송재
              </Typography>
            </NickName>
            <Record>
              <Typography color="black" size="12">
                300전 150승 150패
              </Typography>
            </Record>
            <PercentageBox>
              <WinBox width={80}>
                <Typography color="white" size="16">
                  80%
                </Typography>
              </WinBox>
            </PercentageBox>
          </InfoBox>
          <GameListBox>
            <GameListHeader>
              <EntireList>
                <EntireImg src="../assets/GameList.png" alt="none" />
                <Typography color="black" size="16">
                  방 목록(46개)
                </Typography>
              </EntireList>
              <SearchGameList>
                <RangeBtn>
                  <RangeImg src="../assets/range.png" alt="none" />
                  <Typography color="black" size="16">
                    정렬
                  </Typography>
                </RangeBtn>
                <RefreshBtn>
                  <RefreshImg src="../assets/refresh.png" alt="none" />
                  <Typography color="black" size="16">
                    새로고침
                  </Typography>
                </RefreshBtn>
              </SearchGameList>
            </GameListHeader>
            <GameList>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_v, i) => (
                <Room key={i} />
              ))}
            </GameList>
          </GameListBox>
          <ChatBox>
            <ChatHeader>
              <ChatImg src="../assets/chat.png" alt="none" />
              <LiveChat color="black" size="12">
                실시간 채팅
              </LiveChat>
            </ChatHeader>
            <ChatRoom state="lobby" />
          </ChatBox>
          <UserListBox>
            <UserListHeader>
              <UserListImg src="../assets/InfoAirplane.png" />
              <Typography color="black" size="12">
                접속자 목록
              </Typography>
            </UserListHeader>
            <UserList>
              <Users>
                <UserName color="black" size="12" fontWeight="900">
                  임송재
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤재밌네
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
              <Users>
                <UserName color="black" size="12">
                  캡스톤
                </UserName>
                <UserInfoBtn>정보</UserInfoBtn>
              </Users>
            </UserList>
          </UserListBox>
        </ContentBox>
      </Container>
    </div>
  );
};

export default Lobby;

const HoverMenu = css`
  :hover {
    cursor: pointer;
    position: relative;
    top: -2px;
    background-color: rgba(0, 109, 163, 1);
    height: 36px;
  }
`;

const Scrollbar = css`
  ::-webkit-scrollbar {
    width: 16px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(0, 0, 0, 1); /* 스크롤바의 색상 */
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(198, 198, 198, 1); /*스크롤바 뒷 배경 색상*/
    border-radius: 25px;
  }
`;

const UserInfoBtn = styled.button`
  width: 40px;
  height: 21px;
  font-size: 4px;
  border-radius: 5px;
  background-color: rgba(135, 135, 135, 1);
  border: none;
  color: white;
  font-weight: 200;
  margin-right: 8px;
  &:hover {
    color: black;
  }
`;

const UserName = styled(Typography)`
  margin-left: 4px;
`;

const Users = styled.div`
  display: flex;
  margin: 0 12px 0 12px;
  align-items: center;
  padding: 4px 0;
  justify-content: space-between;
  border-bottom: 0.8px solid black;
`;

const UserListImg = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const UserListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 4px;
  margin: 8px 0;
`;
const ChattingBtn = styled.button`
  width: 10%;
  height: 100%;
  border-radius: 0 15px 15px 0;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: none;
  border-left-color: white;
  background-color: rgba(127, 127, 127, 1);
  color: white;
  &:hover {
    color: black;
  }
`;
const ChattingBox = styled.div`
  width: 97%;
  height: 28px;
  border-radius: 15px;
  background-color: rgba(127, 127, 127, 1);
  margin: 8px auto;
`;
const Chat = styled(Typography)`
  width: 97%;
  padding: 8px 6px;
  border-bottom: 0.8px solid black;
  margin: 0 auto;
`;

const Chatting = styled.input`
  color: white;
  padding: 0 12px;
  width: 90%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(127, 127, 127, 1);
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: white;
    border-top-style: none;
    font-weight: 100;
    font-size: 8px;
  }
`;

const RangeBtn = styled.div`
  display: flex;
  &:hover {
    cursor: pointer;
  }
`;

const RefreshBtn = styled.div`
  display: flex;
  margin-left: 16px;
  &:hover {
    cursor: pointer;
  }
`;

const LiveChat = styled(Typography)`
  margin-right: 40px;
`;
const ChatImg = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;
const ChatHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 8px 0;
`;
const UserList = styled.div`
  background-color: ${customColor.white};
  border-radius: 15px;
  width: 236px;
  height: 184px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  ${Scrollbar}
`;
const RefreshImg = styled.img`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;

const RangeImg = styled.img`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;

const EntireImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;
const GameListHeader = styled.div`
  justify-content: space-between;
  display: flex;
  width: 97%;
  align-items: center;
  margin: 12px 0;
`;
const EntireList = styled.div`
  margin-left: 15px;
  display: flex;
`;
const SearchGameList = styled.div`
  display: flex;
`;
const GameList = styled.div`
  height: 80%;
  width: 97%;
  background-color: ${customColor.white};
  padding: 4px 18px;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  overflow-y: scroll;

  ${Scrollbar}
`;

const BackgroundBox = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(198, 198, 198, 1);
  opacity: 0.7;
  border-radius: 10px;
`;

const WinBox = styled.div<{ width: number }>`
  text-align: center;
  background-color: rgba(0, 109, 163, 1);
  width: ${({ width }) => `${width}%`};
  border-radius: 25px 0 0 25px;
`;
const PercentageBox = styled.div`
  border-radius: 25px;
  background-color: rgba(127, 127, 127, 1);
  margin: 0 auto;
  width: 200px;
  margin-top: 12px;
`;

const Record = styled.div`
  margin: 0 auto;
`;

const NickName = styled.div`
  width: auto;
  display: inline-block;
  margin: 10px auto;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: ${customColor.white};
`;
const UserAirplane = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
`;

const AirplaneBox = styled.div`
  height: 150px;
  background-color: black;
  position: relative;
  border-radius: 15px;
  margin: 0 30px 0 30px;
`;
const InfoAirplane = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
const InfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 12px 0;
`;
const InfoBox = styled.div`
  z-index: 99;
  border-radius: 10px 0 0 0;
  width: 20%;
  height: 60%;
  flex-direction: column;
  display: flex;
`;
const GameListBox = styled.div`
  width: 80%;
  border-radius: 0 10px 0 0;
  height: 60%;
  z-index: 99;
`;
const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 78%;
  border-radius: 0 0 0 10px;
  height: 40%;
  z-index: 99;
`;
const UserListBox = styled.div`
  width: 20%;
  border-radius: 0 0 10px 0;
  height: 40%;
  display: flex;
  flex-direction: column;
  z-index: 99;
`;

const SearchImg = styled.img`
  margin-right: 5px;
  width: 16px;
  height: 16px;
`;
const ContentBox = styled.div`
  position: relative;
  width: 100%;
  height: 592px;
  border-radius: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const Btn = css`
  border-radius: 20px 20px 0 0;
  background-color: rgba(117, 117, 117, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 32px;
`;

const GameStartBtn = styled.div`
  margin-right: 6px;
  ${Btn}
  ${HoverMenu}
`;
const MakeRoomBtn = styled.div`
  ${Btn}
  ${HoverMenu}
`;
const SearchRoomBtn = styled.div`
  ${Btn}
  ${HoverMenu}
`;
const Menu = styled.div`
  display: flex;
  align-items: baseline;
`;
const HelperBtn = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
const SettingBtn = styled.img`
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const Tools = styled.div`
  height: 100%;
`;

const Header = styled.header`
  justify-content: space-between;
  display: flex;
  width: 100%;
  align-items: baseline;
  height: 47px;
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;
  height: 640px;
`;
