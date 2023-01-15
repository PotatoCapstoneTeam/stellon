import { Typography } from '../../../components/Typography';
import styled, { css } from 'styled-components';
import { IRoom } from './GameList';
import { useNavigate } from 'react-router-dom';

const GameStart = ({ list }: { list: IRoom[] }) => {
  const navigate = useNavigate();
  const newList = list.map((i) => i.id);

  const randomPickRoom = () => {
    const randIndex = Math.floor(Math.random() * newList.length);
    navigate(`/game_room/${newList[randIndex]}`);
  };
  
  return (
    <GameStartBtn onClick={randomPickRoom}>
      <SearchImg src="../assets/direction.png" alt="none" />
      <Typography color="white" size="16">
        빠른 시작
      </Typography>
    </GameStartBtn>
  );
};

export default GameStart;

export const SearchImg = styled.img`
  margin-right: 5px;
  width: 16px;
  height: 16px;
`;

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
const GameStartBtn = styled.div`
  margin-right: 6px;
  ${Btn}
  ${HoverMenu}
`;
