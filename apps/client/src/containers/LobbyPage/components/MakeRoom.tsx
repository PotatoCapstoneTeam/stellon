import React from 'react';
import styled, { css } from 'styled-components';
import { Typography } from '../../../components/Typography';
import { SearchImg } from './GameStart';

interface IMakeRoom {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const MakeRoom = ({ setModalOpen }: IMakeRoom) => {
  return (
    <MakeRoomBtn
      onClick={() => {
        setModalOpen(true);
      }}
    >
      <SearchImg src="../assets/home.png" alt="none" />
      <Typography color="white" size="16">
        방 만들기
      </Typography>
    </MakeRoomBtn>
  );
};

export default MakeRoom;

const HoverMenu = css`
  :hover {
    cursor: pointer;
    position: relative;
    top: -2px;
    background-color: rgba(0, 109, 163, 1);
    height: 36px;
  }
`;

const Btn = css`
  border-radius: 20px 20px 0 0;
  background-color: rgba(117, 117, 117, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 32px;
`;
const MakeRoomBtn = styled.div`
  ${Btn}
  ${HoverMenu}
`;
