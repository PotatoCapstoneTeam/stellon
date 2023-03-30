import styled from 'styled-components';
import { RiLogoutBoxLine } from 'react-icons/ri';
import useLogout from '../../../hooks/useLogout';
import HelperBtn from './HelperBtn';
import { AiFillSound } from 'react-icons/ai';
import { AiOutlineSound } from 'react-icons/ai';

interface ITool {
  handleMusic: () => void;
  isPlaying: boolean;
}

const Tool = ({ handleMusic, isPlaying }: ITool) => {
  const { logOut } = useLogout();

  return (
    <Tools>
      <LogOutBtn onClick={() => logOut.mutate()} />
      <HelperBtn />
      {isPlaying ? (
        <SoundOnBtn onClick={handleMusic} />
      ) : (
        <SoundOffBtn onClick={handleMusic} />
      )}
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
  &:active {
    transform: scale(0.95);
  }
`;

const SoundOffBtn = styled(AiOutlineSound)`
  font-size: 39px;
  color: white;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const SoundOnBtn = styled(AiFillSound)`
  font-size: 39px;
  color: white;
  &:hover {
    cursor: pointer;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const Tools = styled.div`
  height: 100%;
`;
