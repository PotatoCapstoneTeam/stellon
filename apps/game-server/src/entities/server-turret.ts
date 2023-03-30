import { ServerScene } from './../scenes/server-scene';
import { ServerBullet } from './server-bullet';
import { Entity, EntityData, Group, Player, Team } from '@stellon/game-core';
import cuid from 'cuid';

export class ServerTurret extends Entity {
  playerGroup: Group<Player>;
  preFireTime = 0;

  constructor(scene: ServerScene, x: number, y: number, public team: Team) {
    super(cuid(), scene, x, y);

    this.playerGroup = scene.playerGroup;
  }

  override update(time: number, delta: number): void {
    if (time - this.preFireTime < 1000) {
      return;
    }

    this.preFireTime = time;

    let b: number | null;

    this.playerGroup.forEach((player) => {
      if (player.team === this.team) {
        return;
      }

      const a = Math.sqrt(
        Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2)
      );

      if (b === null || b > a) {
        b = a;
      }

      if (a > 100) {
        return;
      }

      const scene = this.scene as ServerScene;

      const bullet = new ServerBullet(
        scene,
        this.x,
        this.y,
        this,
        10,
        500,
        -(Math.atan2(this.x - player.x, this.y - player.y) * 180) / Math.PI - 90
      );
      scene.bulletGroup.add(bullet);
    });
  }

  serialize(): EntityData {
    throw new Error('Method not implemented.');
  }
  deserialize(data: EntityData): void {
    throw new Error('Method not implemented.');
  }
}
