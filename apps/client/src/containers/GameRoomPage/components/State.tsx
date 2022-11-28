import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';

export const State = () => {
  return (
    <StateBox>
      <Ready color="black" size="24" fontWeight="900">
        준비
      </Ready>
      <OutBox>
        <Out src="../assets/logout.png" alt="none"></Out>
      </OutBox>
    </StateBox>
  );
};

export default State;
const OutBox = styled.div`
  padding: 20px;
  border-radius: 20px;
  background-color: ${customColor.white};
  &:hover {
    cursor: pointer;
  }
`;
const StateBox = styled.div`
  z-index: 99;
  display: flex;
  align-items: end;
  width: 312px;
  justify-content: space-between;
`;
const Ready = styled(Typography)`
  background-color: ${customColor.white};
  padding: 5px 15px;
  padding: 20px 88px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;
const Out = styled.img`
  width: 24px;
  height: 24px;
`;