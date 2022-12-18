import axios from 'axios';
import { setting } from '../constants/setting';
import { axiosPrivate } from '../util/axios';

export const Api = {
  get: async (url: string) => {
    return await axios.get(setting.baseURL + url);
  },

  getWithToken: async (url: string, token: string) => {
    return await axiosPrivate.get(setting.baseURL + url, {
      headers: { Authorization: token },
    });
  },

  postWithToken: async (url: string, token: string, refreshToken?: string) => {
    return await axiosPrivate.post(
      setting.baseURL + url,
      {},
      {
        headers: {
          Authorization: token,
          RefreshToken: refreshToken,
        },
      }
    );
  },

  postWithParams: async (url: string, params: any) => {
    return await axios.post(setting.baseURL + url, params);
  },

  postWithTokenAndParams: async (url: string, token: string, params: any) => {
    return await axiosPrivate.post(setting.baseURL + url, params, {
      headers: { Authorization: token },
    });
  },

  deleteWithToken: async (url: string, token: string) => {
    return await axiosPrivate.delete(setting.baseURL + url, {
      headers: { Authorization: token },
    });
  },
};
