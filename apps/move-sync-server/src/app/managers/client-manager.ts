export class ClientState {
  horizontalAxis = 0;
  verticalAxis = 0;
  fire = false;

  constructor(public id: string) {}
}

export class ClientManager {
  private clients: {
    [key: string]: ClientState;
  } = {};

  getClient(id: string) {
    if (!this.clients[id]) {
      this.clients[id] = new ClientState(id);
    }

    return this.clients[id];
  }
}
