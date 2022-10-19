import { Scene } from '../scenes/scene';
import { Entity, EntityData } from './entity';

export class Bullet extends Entity {
  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    public speed: number,
    angle: number,
    texture = ''
  ) {
    super(id, scene, x, y, texture);

    this.scene.physics.velocityFromAngle(angle, speed, this.body.velocity);
  }

  serialize(): EntityData {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      speed: this.speed,
      angle: this.angle,
    };
  }

  deserialize(data: EntityData) {
    this.x = +(data['x'] ?? this.x);
    this.y = +(data['y'] ?? this.y);
    this.speed = +(data['speed'] ?? this.speed);
    this.angle = +(data['angle'] ?? this.angle);
  }
}
