import { Api } from './common';

export const lobbyApi = {
  loadRoom: async (token: string) => Api.getWithToken('/room', token),

  connectors: async (token: string) =>
    Api.postWithToken('/room/lobby/users', token),
};
