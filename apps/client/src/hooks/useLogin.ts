import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../api/loginApi';

const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'user_access_token',
    'user_refresh_token',
  ]); // 쿠키 훅
  const navigate = useNavigate();

  // 로그인 체크 (토큰 체크)
  const loginCheck = async () => {
    try {
      await loginApi.loginCheck(cookies['user_access_token']);
      console.log('로그인 중입니다.');

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

  // 재로그인 (토큰 재발급)
  const reLogin = async () => {
    try {
      const res = await loginApi.receiveRefreshToken(
        cookies['user_access_token'],
        cookies['user_refresh_token']
      );
      console.log(res.data);
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
  };

  // 로그아웃
  const logOut = async () => {
    try {
      const token = cookies['user_access_token'];
      console.log(token);
      await loginApi.logout(token);

      removeCookie('user_access_token');
      removeCookie('user_refresh_token');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };
  return { loginCheck, logOut, reLogin };
};

export default useLogin;
