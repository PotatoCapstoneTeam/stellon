import styled from 'styled-components';
import { RiLogoutBoxLine } from 'react-icons/ri';
import useLogout from '../../../hooks/useLogout';
import HelperBtn from './HelperBtn';

const Tool = () => {
  const { logOut } = useLogout();

  return (
    <Tools>
      <LogOutBtn onClick={() => logOut.mutate()} />
      {/* <SettingBtn src="../assets/setting.png" alt="none"/> */}
      <HelperBtn />
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

const SettingBtn = styled.img`
  margin-right: 15px;
  &:hover {
    cursor: pointer;
  }
`;
const Tools = styled.div`
  height: 100%;
`;
