import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IInfo, IUser } from '../containers/LobbyPage/LobbyPage';
import { axiosPrivate } from '../util/axios';

export const useLobbyData = () => {
  const [list, setList] = useState([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [myInfo, setMyInfo] = useState<IInfo>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // 내 정보
  useQuery('myInfo', () => axiosPrivate.get('/user'), {
    onSuccess: (res) => setMyInfo(res.data),
  });

  // 게임룸 리스트
  useQuery('gameRoomList', () => axiosPrivate.get('/room'), {
    onSuccess: (res) => setList(res.data),
    refetchInterval: 1000,
  });

  // 접속자 리스트
  useQuery('lobbyUserList', () => axiosPrivate.get('/room/lobby/users'), {
    onSuccess: (res) => setUserList(res.data),
    refetchInterval: 1000,
  });

  // 로그인(토큰) 체크
  const loginCheck = useMutation(() => axiosPrivate.post('/auth/validate'), {
    onSuccess: (res) => {
      !res && navigate('/');
    },
    onError: (err) => console.log(err),
  });

  // 접속자 리스트에 자신 추가
  const enterUserList = useMutation(
    () => axiosPrivate.post('/room/lobby/users'),
    {
      onSuccess: () => {
        // enterUserList 성공하면 lobbyUserList api 함수를 실행
        queryClient.invalidateQueries('lobbyUserList');
      },
    }
  );

  return { list, userList, myInfo, loginCheck, enterUserList };
};
