import { Bullet, BulletData, Scene } from '@stellon/game-core';

export class ClientBullet extends Bullet {
  constructor(id: string, scene: Scene, data: BulletData) {
    super(id, scene, { ...data, texture: '%Bullet' });
  }
}
