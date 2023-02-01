import styled from 'styled-components';
import Tool from './Tool';
import MakeRoom from './MakeRoom';
import GameStart from './GameStart';
import { IRoom } from './GameList';

const Header = ({ list }: { list: IRoom[] }) => {

  return (
    <Container>
      <Tool />
      <Menu>
        <MakeRoom />
        <GameStart list={list} />
      </Menu>
    </Container>
  );
};

export default Header;

const Menu = styled.div`
  display: flex;
  align-items: baseline;
`;

const Container = styled.header`
  justify-content: space-between;
  display: flex;
  width: 100%;
  align-items: baseline;
  height: 47px;
`;
