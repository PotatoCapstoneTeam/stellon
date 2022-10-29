import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from '../routes/Intro';
import Lobby from '../routes/Lobby';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/lobby" element={<Lobby />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
