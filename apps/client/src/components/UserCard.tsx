import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from './Typography';

interface IUserCard {
  state: boolean;
}

const UserCard = ({ state }: IUserCard) => {
  return (
    <Container>
      <MySpaceShip>
        <SpaceShipImg src="../assets/UserCard/redSpaceShip_2.png" alt="none" />

        {{ state } && (
          <Ready color="yellow" size="48">
            Ready
          </Ready>
        )}
      </MySpaceShip>
      <NickName color="white" size="16">
        임송재
      </NickName>
    </Container>
  );
};

export default UserCard;

const Ready = styled(Typography)`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpaceShipImg = styled.img`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MySpaceShip = styled.div`
  background-color: black;
  height: 160px;
  border-radius: 15px 15px 0 0;
  position: relative;
  width: 100%;
`;
const NickName = styled(Typography)`
  background-color: rgba(29, 74, 157, 1);
  border-radius: 0 0 15px 15px;
  height: 40px;
  width: 100%;
  text-align: center;
  line-height: 40px;
`;
const Container = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
`;
