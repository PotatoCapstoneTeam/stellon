import { axiosPrivate } from '../util/axios';
import { getCookie, setCookie } from '../util/cookies';

export const myInfo = async () => {
  return await axiosPrivate.get('/user', {
    headers: { Authorization: getCookie('user_access_token') },
  });
};
