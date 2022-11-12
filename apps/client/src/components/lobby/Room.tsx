import React from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography';

const Room = () => {
  return (
    <Container>
      <RoomName color="black" size="16">
        초보만 들어오세요
      </RoomName>
      <People>
        <PeopleImg src="../assets/people.svg" alt="none" />
        <Typography color="blue" size="16">
          1/2
        </Typography>
      </People>
      <GameMap color="gray" size="12" fontWeight="500">
        파이썬
      </GameMap>
    </Container>
  );
};

export default Room;

const PeopleImg = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
const People = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;
const GameMap = styled(Typography)`
  width: 50%;
  text-align: right;
`;
const RoomName = styled(Typography)`
  width: 100%;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 412px;
  height: 72px;
  padding: 4px 12px;
  align-items: center;
  border-radius: 15px;
  margin: 10px 12px;
  border: 4px solid rgba(0, 109, 163, 1);
  &:hover {
    cursor: pointer;
  }
`;
