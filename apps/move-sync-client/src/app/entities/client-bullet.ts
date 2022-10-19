import { Bullet, Scene } from '@stellon/game-core';

export class ClientBullet extends Bullet {
  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    speed: number,
    angle: number
  ) {
    super(id, scene, x, y, speed, angle, 'bullet');
  }
}
