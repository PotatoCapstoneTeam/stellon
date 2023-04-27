import { Group, Player, Turret, TurretData } from '@stellon/game-core';
import cuid from 'cuid';

import { ServerScene } from './../scenes/server-scene';
import { ServerBullet } from './server-bullet';

export class ServerTurret extends Turret {
  playerGroup: Group<Player>;

  prevFireTime = 0;

  constructor(scene: ServerScene, data: TurretData) {
    super(cuid(), scene, data);

    this.playerGroup = scene.playerGroup;
  }

  override update(time: number, delta: number): void {
    if (time - this.prevFireTime < 1000 || this.hp <= 0) {
      return;
    }

    this.prevFireTime = time;

    let target:
      | {
          player: Player;
          distance: number;
        }
      | undefined;

    this.playerGroup.forEach((player) => {
      if (player.team === this.team) {
        return;
      }

      const distance = Math.sqrt(
        Math.pow(this.x - player.x, 2) + Math.pow(this.y - player.y, 2)
      );

      if (distance > this.detectionRange) {
        return;
      }

      if (!target || target.distance > distance) {
        target = {
          player,
          distance,
        };
      }
    });

    if (!target) {
      return;
    }

    const bulletAngle =
      -(Math.atan2(this.x - target.player.x, this.y - target.player.y) * 180) /
        Math.PI -
      90;

    new ServerBullet(this.scene as ServerScene, {
      x: this.x,
      y: this.y,
      angle: bulletAngle,
      team: this.team,
      sourceId: this.id,
      damage: this.damage,
      speed: this.shotSpeed,
      range: this.range,
    });
  }
}
