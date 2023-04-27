import { Team } from '..';
import { Scene } from '../scenes/scene';
import { Entity, EntityData } from './entity';

export interface BulletData extends EntityData {
  team: Team;
  sourceId?: string;
  damage: number;
  speed: number;
  lifeTime: number;
}

export class Bullet extends Entity {
  sourceId?: string;
  damage: number;
  speed: number;
  lifeTime: number;

  constructor(id: string, scene: Scene, data: BulletData) {
    super(id, scene, data);

    scene.bulletGroup.add(this);

    this.sourceId = data.sourceId;
    this.damage = data.damage;
    this.speed = data.speed;
    this.lifeTime = data.lifeTime;

    this.scene.physics.velocityFromAngle(
      this.angle,
      this.speed,
      this.body?.velocity
    );
  }

  get source() {
    if (!this.sourceId) {
      return;
    }

    return (this.scene as Scene).findEntity(this.sourceId);
  }

  override update(time: number, delta: number): void {
    this.lifeTime -= delta;

    if (this.lifeTime <= 0) {
      (this.scene as Scene).bulletGroup.remove(this);
    }
  }

  override serialize(): BulletData {
    const data = super.serialize() as BulletData;

    data.sourceId = this.sourceId;
    data.damage = this.damage;
    data.speed = this.speed;
    data.lifeTime = this.lifeTime;

    return data;
  }
}
