export class ClientState {
  horizontalAxis = 0;
  verticalAxis = 0;
  fire = false;

  kill = 0;
  death = 0;

  damageDealtToPlayer = 0;
  damageDealtToNexus = 0;

  constructor(public id: number) {}
}

export class ClientManager {
  private clients: {
    [key: number]: ClientState;
  } = {};

  getClient(id: number) {
    if (!this.clients[id]) {
      this.clients[id] = new ClientState(id);
    }

    return this.clients[id];
  }
}
