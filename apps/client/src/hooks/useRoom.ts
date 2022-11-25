import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { lobbyApi } from '../api/lobbyApi';

const useRoom = () => {
  const [list, setList] = useState([]);
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅
  const watchRoom = async () => {
    try {
      const rooms = await lobbyApi.loadRoom(cookies['user_access_token']);
      setList(rooms.data);
    } catch (err) {
      console.log(err);
    }
  };

  return { watchRoom, list };
};

export default useRoom;
