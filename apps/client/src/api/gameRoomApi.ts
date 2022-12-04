import { Api } from './common';

export const gameRoomApi = {
  deleteConnector: async (token: string) => {
    return await Api.deleteWithToken('/room/lobby/users', token);
  },
};
