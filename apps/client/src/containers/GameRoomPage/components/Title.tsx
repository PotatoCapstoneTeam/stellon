import { Typography } from '../../../components/Typography';
import styled from 'styled-components';

export const Title = () => {
  return (
    <Theme>
      <RoomNumber size="16" color="black" fontWeight="900">
        156번 방
      </RoomNumber>
      <RoomName size="16" color="black" fontWeight="900">
        임송재님의 게임방
      </RoomName>
    </Theme>
  );
};

export default Title;
const RoomName = styled(Typography)`
  padding-left: 28px;
`;
const RoomNumber = styled(Typography)`
  border-right: 2px solid black;
  padding: 4px 28px;
`;
const Theme = styled.div`
  display: flex;
  z-index: 99;
  align-items: center;
`;
