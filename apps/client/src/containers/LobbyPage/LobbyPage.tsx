import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Space from '../../canvas/Space';
import Info from './components/Info';
import GameList from './components/GameList';
import Chat from './components/Chat';
import UserList from './components/UserList';
import Header from './components/Header';
import axios from 'axios';
import { loginApi } from '../../api/loginApi';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import CreateRoomModal from './modal/CreateRoomModal';
import { lobbyApi } from '../../api/lobbyApi';
export interface IInfo {
  nickname: string;
  winRecord: number;
  loseRecord: number;
}

const LobbyPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]); // 쿠키 훅
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<IInfo>();
  const [list, setList] = useState([]);

  const logOut = () => {
    removeCookie('user_access_token');
    removeCookie('user_refresh_token');
    navigate('/');
  };

  const watchRoom = async () => {
    try {
      const rooms = await lobbyApi.loadRoom(cookies['user_access_token']);
      setList(rooms.data);
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    try {
      await loginApi.loginCheck(cookies['user_access_token']);
      console.log('로그인 성공');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.response.data.code);
      if (err.response.data.code === 444) {
        console.log('토큰 재발급 요청입니다');
        await reLogin(); // access 토큰 만료됐을 때 토큰 재발급 함수
      } else {
        logOut();
      }
    }
  };

  const reLogin = async () => {
    try {
      const res = await axios.post(
        'https://stellon.shop/auth/reissue',
        {},
        {
          headers: {
            Authorization: cookies['user_access_token'],
            RefreshToken: cookies['user_refresh_token'],
          },
        }
      );
      const newAccessToken = res.data.response.accessToken;
      const newRefreshToken = res.data.response.refreshToken;
      setCookie('user_access_token', newAccessToken, { path: '/' }); // 쿠키에 access 토큰 저장
      setCookie('user_refresh_token', newRefreshToken, { path: '/' }); // 쿠키에 refresh 토큰 저장
      console.log('토큰 재발급 성공');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      logOut();
    }
    // const access = cookies['user_access_token'];
    // const refresh = cookies['user_refresh_token'];

    // const response = await loginApi.receiveRefreshToken(
    //   access,
    //   refresh
    // );
    // console.log(response);
  };

  const register = async () => {
    try {
      const connectors = await lobbyApi.registration(
        cookies['user_access_token']
      );
      console.log(connectors);
    } catch (err) {
      console.log(err);
    }
  };

  const user = async () => {
    try {
      const info = await lobbyApi.myInfo(cookies['user_access_token']);
      console.log(info.data);
      setData(info.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      await login();
      register();
      watchRoom();
      user();
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
          <Info {...data!} />
          <GameList list={list} />
          <Chat {...data!} />
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
