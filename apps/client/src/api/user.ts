import api from '../util/axios';
import { getCookie, setCookie } from '../util/cookies';

export const myInfo = async () => {
  return await api.get('/user', {
    headers: { Authorization: getCookie('user_access_token') },
  });
};
