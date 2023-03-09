import { useState } from 'react';
import { useQuery } from 'react-query';
import { axiosPrivate } from '../util/axios';

export const useCheckRoom = (id: string) => {
  const [check, setCheck] = useState<boolean>();
  const { refetch } = useQuery(
    ['checkRoom', id],
    () => axiosPrivate.get(`/room/validate/${id}`),
    {
      enabled: false,
      onSuccess: ({ data }) => {
        setCheck(data);
      },
      onError: (error) => {
        alert('GameRoomPage 로딩 오류');
      },
    }
  );

  return { check, refetch };
};
