import styled, { css } from 'styled-components';
import Room from './Room';
import { customColor } from '../../../constants/customColor';
import Entire from './Entire';
import Search from './Search';

const GameList = () => {
  return (
    <GameListBox>
      <GameListHeader>
        <Entire />
        <Search />
      </GameListHeader>
      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_v, i) => (
          <Room key={i} />
        ))}
      </List>
    </GameListBox>
  );
};

export default GameList;

const Scrollbar = css`
  ::-webkit-scrollbar {
    width: 16px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(0, 0, 0, 1); /* 스크롤바의 색상 */
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(198, 198, 198, 1); /*스크롤바 뒷 배경 색상*/
    border-radius: 25px;
  }
`;
const List = styled.div`
  height: 80%;
  width: 97%;
  background-color: ${customColor.white};
  padding: 4px 18px;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: center;
  overflow-y: scroll;

  ${Scrollbar}
`;
const GameListBox = styled.div`
  width: 80%;
  border-radius: 0 10px 0 0;
  height: 60%;
  z-index: 99;
`;

const GameListHeader = styled.div`
  justify-content: space-between;
  display: flex;
  width: 97%;
  align-items: center;
  margin: 12px 0;
`;
