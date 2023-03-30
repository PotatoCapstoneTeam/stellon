import { Bullet, Entity, Scene } from '@stellon/game-core';
import { ClientPlayer } from './client-player';

export class ClientBullet extends Bullet {
  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    source: Entity,
    damage: number,
    speed: number,
    angle: number
  ) {
    console.log(source);
    super(
      id,
      scene,
      x,
      y,
      source,
      damage,
      speed,
      angle,
      'redBullet'
      // (source as ClientPlayer).team === 'RED_TEAM' ? 'redBullet' : 'blueBullet'
    );
  }
}
