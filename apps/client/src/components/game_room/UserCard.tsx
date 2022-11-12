import React, { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '../Typography';

interface IUserCard {
  state: boolean;
  // 레디상태, 닉네임, 비행기 색깔와 기종, 유저의 정보 필요
}

const UserCard = ({ state }: IUserCard) => {
  console.log(state);
  return (
    <Container>
      <MySpaceShip>
        <SpaceShipImg src="../assets/UserCard/redSpaceShip_2.png" alt="none" />

        {state && (
          <Ready color="yellow" size="40" fontWeight="900">
            READY
          </Ready>
        )}
      </MySpaceShip>
      <Footer>
        <ReaderImg src="../assets/UserCard/Reader.png" />
        <NickName color="white" size="16">
          임송재
        </NickName>
        <InfoImg src="../assets/UserCard/info.png" />
      </Footer>
    </Container>
  );
};

export default UserCard;

const ReaderImg = styled.img`
  width: 20px;
  height: 20px;
`;

const InfoImg = styled.img`
  width: 20px;
  height: 20px;
  &:hover {
    filter: opacity(0.5) drop-shadow(0 0 0 red);
    cursor: pointer;
  }
`;

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
  height: 140px;
  border-radius: 15px 15px 0 0;
  position: relative;
  width: 100%;
`;
const Footer = styled.footer`
  background-color: rgba(29, 74, 157, 1);
  border-radius: 0 0 15px 15px;
  height: 40px;
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;
const NickName = styled(Typography)`
  text-align: center;
  line-height: 40px;
`;
const Container = styled.div`
  position: relative;
  width: 200px;
  height: 184px;
  border: 2px solid transparent;
  /* border: 2px solid yellow; */
  border-radius: 15px;
`;
