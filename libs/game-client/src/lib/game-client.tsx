import styled from 'styled-components';

/* eslint-disable-next-line */
export interface GameClientProps {}

const StyledGameClient = styled.div`
  color: pink;
`;

export function GameClient(props: GameClientProps) {
  return (
    <StyledGameClient>
      <h1>Welcome to GameClient!</h1>
    </StyledGameClient>
  );
}

export default GameClient;
