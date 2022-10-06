import { Renderer } from '@stellon/game-client';
import styled from 'styled-components';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <Renderer />
    </StyledApp>
  );
}

export default App;
