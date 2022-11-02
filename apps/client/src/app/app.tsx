import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Intro from '../routes/Intro';
import Lobby from '../routes/Lobby';
import { CookiesProvider } from 'react-cookie';

export function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/lobby" element={<Lobby />} />
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
