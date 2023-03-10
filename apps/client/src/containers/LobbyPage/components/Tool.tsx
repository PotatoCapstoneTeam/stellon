import { axiosPrivate } from '../../../util/axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useMutation } from 'react-query';
import { removeSessionStorageItem } from '../../../util/sessionStorage';
import useLogout from '../../../hooks/useLogout';

const Tool = () => {
  const navigate = useNavigate();
  const { logOut } = useLogout();

  // 로그아웃 api , delete , 토큰 삭제
  // const logOut = useMutation(() => axiosPrivate.post('/auth/logout'), {
  //   onSuccess: () => deleteUserList.mutate(),
  //   onError: () => alert('로그아웃에 실패하였습니다.'),
  // });
  // const deleteUserList = useMutation(
  //   () => axiosPrivate.delete('/room/lobby/users'),
  //   {
  //     onSuccess: () => {
  //       removeSessionStorageItem('user_access_token');
  //       removeSessionStorageItem('user_refresh_token');
  //       navigate('/');
  //     },
  //     onError: (err) => console.log(err),
  //   }
  // );

  return (
    <Tools>
      <LogOutBtn onClick={() => logOut.mutate()} />
      {/* <SettingBtn src="../assets/setting.png" alt="none"></SettingBtn>
      <HelperBtn src="../assets/help.png" alt="none"></HelperBtn> */}
    </Tools>
  );
};

export default Tool;

const LogOutBtn = styled(RiLogoutBoxLine)`
  font-size: 39px;
  color: white;
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;

const HelperBtn = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
const SettingBtn = styled.img`
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const Tools = styled.div`
  height: 100%;
`;
