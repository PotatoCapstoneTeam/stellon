import { axiosPrivate } from '../../../util/axios';
import { deleteCookie } from '../../../util/cookies';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RiLogoutBoxLine } from 'react-icons/ri';

const Tool = () => {
  const navigate = useNavigate();
  // 로그아웃 api , delete , 토큰 삭제
  const logOut = async () => {
    try {
      await axiosPrivate.post('/auth/logout');
      await axiosPrivate.delete('/room/lobby/users');
      deleteCookie('user_access_token');
      deleteCookie('user_refresh_token');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Tools>
      <LogOutBtn onClick={logOut} />
      <SettingBtn src="../assets/setting.png" alt="none"></SettingBtn>
      <HelperBtn src="../assets/help.png" alt="none"></HelperBtn>
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
