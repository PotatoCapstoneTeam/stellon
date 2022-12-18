import { useCookies } from 'react-cookie';

export const useCookie = () => {
  const [cookies, setCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]);

  const access = cookies['user_access_token'];
  const refresh = cookies['user_refresh_token'];

  return { access, refresh, setCookie };
};
