import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GameRoom from '../routes/GameRoom';
import Intro from '../routes/Intro';
import Lobby from '../routes/Lobby';
import SignUp from '../routes/SignUp';
import { CookiesProvider } from 'react-cookie';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

export function App() {
  const queryClient = new QueryClient();
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Intro />} />
            <Route path="/lobby" element={<Lobby />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/game_room/:id" element={<GameRoom />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
