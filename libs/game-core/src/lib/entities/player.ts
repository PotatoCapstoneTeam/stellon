import { Scene } from '../scenes/scene';
import { DamageableEntity, DamageableEntityData } from './entity';

export type PlayerStatus = 'LIVE' | 'DEATH';

export interface PlayerData extends DamageableEntityData {
  status: PlayerStatus;
  speed: number;
  angularSpeed: number;
  bulletSpeed: number;
  bulletLifeTime: number;
  fireDelay: number;
  damage: number;
}

export class Player extends DamageableEntity {
  status: PlayerStatus;
  speed: number;
  angularSpeed: number;
  bulletSpeed: number;
  bulletLifeTime: number;
  fireDelay: number;
  damage: number;

  constructor(id: string, scene: Scene, data: PlayerData) {
    super(id, scene, data);

    scene.playerGroup.add(this);

    this.status = data.status;
    this.speed = data.speed;
    this.angularSpeed = data.angularSpeed;
    this.bulletSpeed = data.bulletSpeed;
    this.bulletLifeTime = data.bulletLifeTime;
    this.fireDelay = data.fireDelay;
    this.damage = data.damage;
  }

  override serialize(): PlayerData {
    const data = super.serialize() as PlayerData;

    data.status = this.status;
    data.speed = this.speed;
    data.angularSpeed = this.angularSpeed;
    data.bulletSpeed = this.bulletSpeed;
    data.bulletLifeTime = this.bulletLifeTime;
    data.fireDelay = this.fireDelay;
    data.damage = this.damage;

    return data;
  }
}
