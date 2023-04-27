import {
  Bullet,
  BulletData,
  CreateEvent,
  DestroyEvent,
  EntityType,
} from '@stellon/game-core';
import cuid from 'cuid';
import { ServerScene } from '../scenes/server-scene';
import { ServerRoom } from '../server-socket';

export class ServerBullet extends Bullet {
  room: ServerRoom;

  constructor(scene: ServerScene, data: BulletData) {
    super(cuid(), scene, data);

    this.room = scene.room;

    this.room.emit('create', {
      id: this.id,
      type: EntityType.BULLET,
      data,
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
