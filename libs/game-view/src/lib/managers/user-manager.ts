import { Score, Team } from '@stellon/game-core';

type User = {
  id: number;
  nickname: string;
  team: Team;
  kill: number;
  death: number;
};

export class PlayerManager {
  private player: Map<number, User> = new Map();

  add(id: number, nickname: string, team: Team) {
    this.player.set(id, { id, nickname, team, kill: 0, death: 0 });
  }

  setScore(score: Score) {
    score.forEach((value) => {
      const player = this.player.get(value.id);

      if (!player) {
        return;
      }

      player.kill = value.kill;
      player.death = value.death;
    });
  }
}
