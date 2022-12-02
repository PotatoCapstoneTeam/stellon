import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';

export interface IStateBtn {
  ready: () => void;
  setReadyToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReadyBtn = ({ ready, setReadyToggle }: IStateBtn) => {
  const readyMyUser = () => {
    ready();
    setReadyToggle(true);
  };

  return (
    <Container onClick={readyMyUser}>
      <Ready color="black" size="24" fontWeight="900">
        준비
      </Ready>
    </Container>
  );
};

export default ReadyBtn;
const Container = styled.div``;
const Ready = styled(Typography)`
  background-color: ${customColor.white};
  padding: 5px 15px;
  padding: 20px 88px;
  border-radius: 20px;
  height: 70px;
  width: 230px;
  &:hover {
    cursor: pointer;
  }
`;
