import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';
import { useNavigate } from 'react-router-dom';
import ReadyBtn from '../../LobbyPage/components/ReadyBtn';
import ReReady from '../../LobbyPage/components/ReReady';
import { MdOutlineChangeCircle } from 'react-icons/md';

export interface IState {
  ready: () => void;
  start: () => void;
  change: () => void;
  readyToggle: boolean;
}

export const State = ({ ready, start, readyToggle, change }: IState) => {
  const navigate = useNavigate();
  const outRoom = () => {
    navigate(-1);
  };
  const startGame = () => {
    start();
  };
  const changeTeam = () => {
    change();
  };
  return (
    <StateBox>
      <StartBox onClick={startGame}>
        <Start color="black" size="24" fontWeight="900">
          시작
        </Start>
      </StartBox>
      <ChangeBox onClick={changeTeam}>
        <Change />
      </ChangeBox>
      {!readyToggle ? <ReadyBtn ready={ready} /> : <ReReady ready={ready} />}
      <OutBox onClick={outRoom}>
        <Out src="../assets/logout.png" alt="none"></Out>
      </OutBox>
    </StateBox>
  );
};

export default State;
const ChangeBox = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: ${customColor.white};
  &:hover {
    cursor: pointer;
  }
`;
const Change = styled(MdOutlineChangeCircle)`
  width: 24px;
  height: 24px;
`;
const OutBox = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: ${customColor.white};
  &:hover {
    cursor: pointer;
  }
`;
const StateBox = styled.div`
  z-index: 2;
  display: flex;
  align-items: end;
  width: 312px;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const StartBox = styled.div``;
const Start = styled(Typography)`
  align-items: center;
  justify-content: center;
  display: flex;
  background-color: ${customColor.white};
  padding: 20px 88px;
  border-radius: 20px;
  height: 70px;
  width: 230px;
  &:hover {
    cursor: pointer;
  }
`;

const Out = styled.img`
  width: 24px;
  height: 24px;
`;
