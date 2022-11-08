import { Data } from '@geckos.io/server';
import {
  Bullet,
  CreateEvent,
  Entity,
  EntityType,
  Scene,
} from '@stellon/game-core';
import cuid = require('cuid');

export class ServerBullet extends Bullet {
  constructor(
    scene: Scene,
    x: number,
    y: number,
    source: Entity,
    damage: number,
    speed: number,
    angle: number,
    room: {
      emit: (eventName: string, data: Data) => void;
    }
  ) {
    super(cuid(), scene, x, y, source, damage, speed, angle);

    room.emit('create', {
      type: EntityType.BULLET,
      data: this.serialize(),
    } as CreateEvent);
  }
}
