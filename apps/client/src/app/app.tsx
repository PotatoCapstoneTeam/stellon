import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameRoom from '../routes/GameRoom';
import Intro from '../routes/Intro';
import Lobby from '../routes/Lobby';
import Space from '../canvas/Space';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/game_room" element={<GameRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
