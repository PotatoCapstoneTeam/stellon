import { Data } from '@geckos.io/server';
import {
  Bullet,
  CreateEvent,
  DestroyEvent,
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
    public room: {
      emit: (eventName: string, data: Data) => void;
    }
  ) {
    super(cuid(), scene, x, y, source, damage, speed, angle);

    room.emit('create', {
      type: EntityType.BULLET,
      data: this.serialize(),
    } as CreateEvent);
  }

  override destroy(fromScene?: boolean): void {
    super.destroy(fromScene);

    this.room.emit('destroy', {
      id: this.id,
      type: EntityType.BULLET,
    } as DestroyEvent);
  }
}
