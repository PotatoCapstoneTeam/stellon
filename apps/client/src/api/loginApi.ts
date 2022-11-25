import { Api } from './common';

interface ILogin {
  email: string;
  password: string;
}

export const loginApi = {
  loginCheck: async (token: string) => {
    await Api.postWithToken('/auth/validate', token);
  },

  receiveRefreshToken: async (accessToken: string, refreshToken: string) => {
    await Api.postWithToken('/auth/reissue', accessToken, refreshToken);
  },

  tryLogin: async (data: ILogin) => {
    await Api.postWithParams('/auth/login', data);
  },
};
