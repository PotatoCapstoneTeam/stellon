import { Entity, EntityConfig } from './entity';

export type BulletConfig = EntityConfig & {
  speed: number;
  angle: number;
};

export class Bullet extends Entity {
  constructor(config: BulletConfig) {
    super('bullet', config);

    this.scene.physics.velocityFromAngle(
      config.angle,
      config.speed,
      this.body.velocity
    );
  }
}
