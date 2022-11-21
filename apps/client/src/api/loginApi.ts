import { Api } from './common';

export const loginApi = {
  loginCheck: async (token: any) => {
    await Api.postWithToken('/auth/validate', token);
  },

  receiveRefreshToken: async (accessToken: any, refreshToken: any) => {
    await Api.postWithToken('/auth/reissue', accessToken, refreshToken);
  },
};
