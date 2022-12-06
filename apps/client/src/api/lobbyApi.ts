import { Api } from './common';
interface IMakeRoom {
  roomName: string;
  roomSize: number;
  password: string;
}

export const lobbyApi = {
  loadRoom: async (token: string) => await Api.getWithToken('/room', token),

  makeRoom: async (token: string, data: IMakeRoom) =>
    await Api.postWithTokenAndParams('/room', token, data),

  myInfo: async (token: string) => await Api.getWithToken('/user', token),

  registration: async (token: string) =>
    await Api.postWithToken('/room/lobby/users', token),

  connectingUser: async (token: string) =>
    await Api.getWithToken('/room/lobby/users', token),
};
