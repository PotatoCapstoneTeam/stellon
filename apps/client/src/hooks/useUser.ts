import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { lobbyApi } from '../api/lobbyApi';

interface IInfo {
  nickname: string;
  winRecord: number;
  loseRecord: number;
}

const useLogin = () => {
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅
  const [userInfo, setUserInfo] = useState<IInfo>();

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
    console.log('접속자목록에서 지우기');
  };

  return { register, user, deleteUserList, userInfo };
};

export default useLogin;
