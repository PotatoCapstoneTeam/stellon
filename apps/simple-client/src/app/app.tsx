import { GameView } from '@stellon/game-view';
import styled from 'styled-components';
import axios from 'axios';
import { useEffect, useState } from 'react';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const id = prompt('Your Id');

    axios(`${process.env['NX_MAIN_SERVER_URL']}/join`, {
      method: 'POST',
      data: { id },
    }).then((value) => {
      setToken(value.data.token);
      console.log(value.data.token);
    });
  }, []);

  return (
    <StyledApp>
      {token ? (
        <GameView
          url={process.env['NX_STAGE_SERVER_URL'] ?? ''}
          token={token}
          onEnd={() => {
            //
          }}
        />
      ) : undefined}
    </StyledApp>
  );
}

export default App;
