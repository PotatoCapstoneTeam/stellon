import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { lobbyApi } from '../../api/lobbyApi';
import { loginApi } from '../../api/loginApi';
import Space from '../../canvas/Space';
import ChatRoom from '../../components/ChatRoom';
import { IInfo } from '../LobbyPage/LobbyPage';
import { Map, Title, Info, Client, State } from './components/index';

const GameRoomPage = () => {
  const { id } = useParams();
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]); // 쿠키 훅
  const [data, setData] = useState<IInfo>();
  const navigate = useNavigate();
  const user = async () => {
    try {
      const info = await lobbyApi.myInfo(cookies['user_access_token']);
      console.log(info.data);
      setData(info.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    removeCookie('user_access_token');
    removeCookie('user_refresh_token');
    navigate('/');
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

  const deleteUserList = async () => {
    console.log('접속자목록에서 지우기');
  };

  useEffect(() => {
    (async () => {
      await login();
      await deleteUserList();
      user();
    })();
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
          <ChatRoom state="chatRoom" roomId={id} nickname={data?.nickname} />
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
