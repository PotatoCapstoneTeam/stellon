import axios from 'axios';
import { setting } from '../constants/setting';

export const Api = {
  get: async (url: string) => await axios.get(setting.baseURL + url),

  getWithToken: async (url: string, token: string) =>
    await axios.get(setting.baseURL + url, {
      headers: { Authorization: token },
    }),

  postWithToken: async (url: string, token: string, refreshToken?: string) =>
    await axios.post(
      setting.baseURL + url,
      {},
      {
        headers: {
          Authorization: token,
          RefreshToken: refreshToken,
        },
      }
    ),
};
