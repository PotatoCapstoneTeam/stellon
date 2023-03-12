import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';
import { IStateBtn } from './ReadyBtn';

const ReReady = ({ ready }: IStateBtn) => {
  const reReadyMyUser = () => {
    ready();
  };

  return (
    <Container onClick={reReadyMyUser}>
      <ResetReady color="black" size="24" fontWeight="900">
        준비 해제
      </ResetReady>
    </Container>
  );
};

export default ReReady;

const Container = styled.div`
  &:active {
    transform: scale(0.95);
  }
`;

const ResetReady = styled(Typography)`
  width: 230px;
  height: 70px;
  display: flex;
  align-items: center;
  background-color: ${customColor.white};
  padding: 20px 0;
  justify-content: center;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;
