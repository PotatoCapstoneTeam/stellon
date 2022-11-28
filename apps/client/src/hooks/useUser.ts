import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { gameRoomApi } from '../api/gameRoomApi';
import { lobbyApi } from '../api/lobbyApi';
import useLogin from '../hooks/useLogin';

interface IInfo {
  nickname: string;
  winRecord: number;
  loseRecord: number;
}

const useUser = () => {
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅
  const [userInfo, setUserInfo] = useState<IInfo>();
  const { loginCheck } = useLogin();

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
      setUserInfo(info.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUserList = async () => {
    console.log('로비리스트 삭제');
    await gameRoomApi.deleteConnector(cookies['user_access_token']);
  };

  return { register, user, deleteUserList, userInfo };
};

export default useUser;
