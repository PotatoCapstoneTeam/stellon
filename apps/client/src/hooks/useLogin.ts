import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/loginApi';

const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]); // 쿠키 훅
  const navigate = useNavigate();
  
  const login = async () => {
    try {
      await loginApi.loginCheck(cookies['user_access_token']);
      console.log('로그인 성공');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err.response.data.code);
      if (err.response.data.code === 444) {
        console.log('토큰 재발급 요청입니다');
        await reLogin(); // access 토큰 만료됐을 때 토큰 재발급 함수
      } else {
        alert('다시 로그인 하세요');
        logOut();
      }
    }
  };

  const reLogin = async () => {
    try {
      const res = await axios.post(
        'https://stellon.shop/auth/reissue',
        {},
        {
          headers: {
            Authorization: cookies['user_access_token'],
            RefreshToken: cookies['user_refresh_token'],
          },
        }
      );
      const newAccessToken = res.data.response.accessToken;
      const newRefreshToken = res.data.response.refreshToken;
      setCookie('user_access_token', newAccessToken, { path: '/' }); // 쿠키에 access 토큰 저장
      setCookie('user_refresh_token', newRefreshToken, { path: '/' }); // 쿠키에 refresh 토큰 저장
      console.log('토큰 재발급 성공');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.log(err);
      logOut();
    }
    // const access = cookies['user_access_token'];
    // const refresh = cookies['user_refresh_token'];

    // const response = await loginApi.receiveRefreshToken(
    //   access,
    //   refresh
    // );
    // console.log(response);
  };

  const logOut = () => {
    removeCookie('user_access_token');
    removeCookie('user_refresh_token');
    navigate('/');
  };
  return { login, logOut, reLogin };
};

export default useLogin;
