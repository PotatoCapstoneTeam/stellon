import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { IRoom } from '../containers/LobbyPage/components/GameList';
import { IInfo } from '../containers/LobbyPage/components/Info';
import { IUser } from '../containers/LobbyPage/LobbyPage';
import { axiosPrivate } from '../util/axios';

const nothing = {
  nickname: '이름없음',
  winRecord: 0,
  loseRecord: 0,
};

export const useLobbyData = () => {
  const [list, setList] = useState<IRoom[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [myInfo, setMyInfo] = useState<IInfo>(nothing);
  const navigate = useNavigate();

  const exitScreen = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    // 창을 나갈 때 delete요청
    axiosPrivate.delete('/room/lobby/users');
    e.returnValue = '';
  };

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
      enterUserList.mutate();
    },
    onError: (err) => console.log(err),
  });

  // 접속자 리스트에 자신 추가
  const enterUserList = useMutation(
    () => axiosPrivate.post('/room/lobby/users'),
    { onSuccess: () => console.log('접속자 리스트에 추가 완료') }
  );

  useEffect(() => {
    (async () => {
      window.addEventListener('unload', exitScreen);
      loginCheck.mutate();

      return () => {
        window.removeEventListener('unload', exitScreen);
      };
    })();
  }, []);

  return { list, userList, myInfo, loginCheck, enterUserList };
};
