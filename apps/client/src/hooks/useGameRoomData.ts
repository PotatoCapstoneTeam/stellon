import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { IInfo } from '../containers/LobbyPage/LobbyPage';
import { axiosPrivate } from '../util/axios';

export const useGameRoomData = () => {
  const [myInfo, setMyInfo] = useState<IInfo>();

  useQuery('myInfo', () => axiosPrivate.get('/user'), {
    onSuccess: (res) => setMyInfo(res.data),
  });

  const deleteUserList = useMutation(() =>
    axiosPrivate.delete('/room/lobby/users')
  );

  return { deleteUserList, myInfo };
};
