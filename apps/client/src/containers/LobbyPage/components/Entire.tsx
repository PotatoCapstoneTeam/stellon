import styled from 'styled-components';
import { Typography } from '../../../components/Typography';

const Entire = (props: { count: number }) => {
  return (
    <EntireList>
      <EntireImg src="../assets/GameList.png" alt="none" />
      <Typography color="black" size="16">
        방 목록 ( {props.count} )
      </Typography>
    </EntireList>
  );
};

export default Entire;

const EntireList = styled.div`
  align-items: center;
  margin-left: 15px;
  display: flex;
`;
const EntireImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 10px;
`;
