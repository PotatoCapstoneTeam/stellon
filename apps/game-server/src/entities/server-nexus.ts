import { Nexus, Scene, Team } from '@stellon/game-core';
import cuid from 'cuid';

export class ServerNexus extends Nexus {
  constructor(scene: Scene, x: number, y: number, team: Team) {
    super(cuid(), scene, x, y, team);
  }
}
