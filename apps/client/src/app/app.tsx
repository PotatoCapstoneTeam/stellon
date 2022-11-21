import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameRoom from '../routes/GameRoom';
import Intro from '../routes/Intro';
import Lobby from '../routes/Lobby';
import { CookiesProvider } from 'react-cookie';
import Space from '../canvas/Space';

export function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/lobby" element={<Lobby />} />
          <Route path="/game_room/:id" element={<GameRoom />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
