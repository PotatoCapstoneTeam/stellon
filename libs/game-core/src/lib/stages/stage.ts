import { Player } from '../entities';

export class EnitityContainer {
  private players: Player[] = [];

  addPlayer(player: Player) {
    this.players.push(player);
  }

  removePlayer(id: string) {
    const index = this.players.findIndex((player) => player.id === id);

    if (index !== -1) {
      this.players.splice(index);
    }
  }

  getPlayers() {
    return this.players;
  }

  findPlayer(id: string) {
    return this.players.find((player) => player.id === id);
  }
}
