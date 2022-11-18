import { Api } from './common';

export const lobbyApi = {
  loadRoom: async (token: string) => Api.getWithToken('/room', token),
};
