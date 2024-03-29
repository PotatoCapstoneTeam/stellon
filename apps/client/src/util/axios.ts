import axios from 'axios';
import { setting } from '../constants/setting';
import { memorizedRefreshToken } from './refreshToken';
import { getSessionStorageItem } from './sessionStorage';

axios.defaults.baseURL = setting.baseURL;

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      'Content-Type': `application/json`,
      Authorization: getSessionStorageItem(`user_access_token`),
      RefreshToken: getSessionStorageItem('user_refresh_token'),
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    console.log(err);
    // 무한 루프 방지 코드
    if (err.response.data.status === 500) {
      return console.log('500 Error 이미 등록된 유저입니다.');
    } else if (err.response.data.error === '존재하지 않는 유저입니다.') {
      return console.log('이미 로비리스트에 삭제하였음.');
    } else if (err.response.data.message === '유효하지 않은 토큰입니다.') {
      return window.location.replace('/');
    } else if (err.response.data.status === 409) {
      return () => {
        console.log('다시 접속자 목록에 등록합니다.');
        axios(err.config);
      };
    } else if (err.response.data.error === '비밀번호가 일치하지 않습니다.') {
      return alert('비밀번호가 일치하지 않습니다.');
    } else if (err.response.data.error === '가득 찬 방입니다.') {
      return alert('가득 찬 방입니다.');
    } else if (err.response.data.error === '존재하지 않는 방입니다.') {
      return () => {
        window.location.replace('/lobby');
        alert('존재하지 않는 방입니다.');
      };
    } else if (err.response.data.error === 'Not Found') {
      console.log(err);
      return alert('방 비밀번호가 틀렸습니다.');
    } else {
      console.log(err);

      // 토큰 재발급
      const res = await memorizedRefreshToken();
      console.log(res);
      if (res?.data.response.accessToken) {
        const { accessToken, refreshToken } = res.data.response;
        err.config.headers = {
          ...err.config.headers,
          Authorization: accessToken,
          RefreshToken: refreshToken,
        };
      }

      return axios(err.config);
    }
  }
);

export const axiosPrivate = axios;
