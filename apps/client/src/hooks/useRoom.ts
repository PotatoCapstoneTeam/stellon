import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { lobbyApi } from '../api/lobbyApi';
import useLogin from './useLogin';

const useRoom = () => {
  const [list, setList] = useState([]);
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅

  // 게임방 리스트 GET
  const watchRoom = async () => {
    try {
      const rooms = await lobbyApi.loadRoom(cookies['user_access_token']);
      console.log(rooms.data);
      setList(rooms.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { watchRoom, list };
};

export default useRoom;
