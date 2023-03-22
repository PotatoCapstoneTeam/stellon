import { axiosPublic } from './axiosPublic';
import mem from 'mem';
import { getSessionStorageItem, setSessionStorageItem } from './sessionStorage';

const refreshTokenFn = async () => {
  const access = getSessionStorageItem('user_access_token');
  const refresh = getSessionStorageItem('user_refresh_token');
  try {
    const res = await axiosPublic.post(
      '/auth/reissue',
      {},
      {
        headers: {
          Authorization: access,
          RefreshToken: refresh,
        },
      }
    );

    setSessionStorageItem('user_access_token', res.data.response.accessToken);
    setSessionStorageItem('user_refresh_token', res.data.response.refreshToken);
    console.log('토큰 재발급 성공');
    console.log(res);
    return res;
  } catch (err) {
    console.log(err);
    // 토큰 삭제해 버리기
  }
};

const maxAge = 10000;

export const memorizedRefreshToken = mem(refreshTokenFn, { maxAge });
