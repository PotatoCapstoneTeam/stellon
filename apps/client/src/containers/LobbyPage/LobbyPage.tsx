import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import useApi from '../../util/useApi';
import CreateRoomModal from './modal/CreateRoomModal';
import useWebSocket from '../../hooks/useWebSocket';
import Info from './components/Info';
import GameList from './components/GameList';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import { lobbyApi } from '../../api/lobbyApi';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { loginApi } from '../../api/loginApi';

const LobbyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]); // 쿠키 훅
  const [modalOpen, setModalOpen] = useState(false);
  const { connect, send } = useWebSocket();
  const [list, setList] = useState([]);

  const login = async () => {
    try {
      await loginApi.loginCheck(cookies['user_access_token']);
      console.log('로그인 성공');
    } catch (err: any) {
      console.log(err.response.data.code);
      if (err.response.data.code === 444) {
        console.log('토큰 재발급 요청입니다');
        reLogin(); // access 토큰 만료됐을 때 토큰 재발급 함수
      }
    }
  };

  const reLogin = async () => {


    //   axios
    //     .post(
    //       'https://stellon.shop/auth/reissue',
    //       {},
    //       {
    //         headers: {
    //           Authorization: cookies['user_access_token'],
    //           RefreshToken: cookies['user_refresh_token'],
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res);
    //     });
    // };
    


    const access = cookies['user_access_token'];
    const refresh = cookies['user_refresh_token'];

    const response = await loginApi.receiveRefreshToken(
      access,
      refresh
    );
    console.log(response);

    // const response = await axios.post(
    //   'https://stellon.shop/auth/reissue',
    //   {},
    //   {
    //     headers: {
    //       Authorization: cookies['user_access_token'],
    //       RefreshToken: cookies['user_refresh_token'],
    //     },
    //   }
    // );
    // console.log(response);
  };

  return (
    <div>
      <Space />
      <Container onClick={login}>
        <Header setModalOpen={setModalOpen} />
        <ContentBox>
          <BackgroundBox />
          <Info />
          <GameList />
          <Chat />
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
