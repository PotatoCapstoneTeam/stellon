import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { axiosPrivate } from '../util/axios';
import { removeSessionStorageItem } from '../util/sessionStorage';

const useLogout = () => {
  const navigate = useNavigate();
  // 로그아웃 api , delete , 토큰 삭제
  const logOut = useMutation(() => axiosPrivate.post('/auth/logout'), {
    onSuccess: () => deleteUserList.mutate(),
    onError: () => alert('로그아웃에 실패하였습니다.'),
  });
  const deleteUserList = useMutation(
    () => axiosPrivate.delete('/room/lobby/users'),
    {
      onSuccess: () => {
        removeSessionStorageItem('user_access_token');
        removeSessionStorageItem('user_refresh_token');
        navigate('/');
      },
      onError: (err) => console.log(err),
    }
  );
  return { logOut, deleteUserList };
};

export default useLogout;
