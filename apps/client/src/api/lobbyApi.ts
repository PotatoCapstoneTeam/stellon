import { Api } from './common';

export const lobbyApi = {
  loadRoom: async (token: string) => Api.getWithToken('/room', token),

  myInfo: async (token: string) => Api.getWithToken('/user', token),

  registration: async (token: string) =>
    Api.postWithToken('/room/lobby/users', token),

  connectingUser: async (token: string) =>
    Api.getWithToken('/room/lobby/users', token),
};
