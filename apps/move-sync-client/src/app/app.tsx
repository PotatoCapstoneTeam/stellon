import styled from 'styled-components';
import { Renderer } from './renderer';

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
