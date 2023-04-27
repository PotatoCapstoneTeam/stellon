import { Scene } from '../scenes/scene';
import { DamageableEntity, DamageableEntityData, EntityType } from './entity';

export type PlayerState = 'Live' | 'Death';

export interface PlayerData extends DamageableEntityData {
  state: PlayerState;
  speed: number;
  angularSpeed: number;
  shotSpeed: number;
  range: number;
  fireDelay: number;
  damage: number;
}

export class Player extends DamageableEntity {
  override state: PlayerState;
  speed: number;
  angularSpeed: number;
  shotSpeed: number;
  range: number;
  fireDelay: number;
  damage: number;

  constructor(id: string, scene: Scene, data: PlayerData) {
    super(id, EntityType.Player, scene, data);

    scene.playerGroup.add(this);

    this.state = data.state;
    this.speed = data.speed;
    this.angularSpeed = data.angularSpeed;
    this.shotSpeed = data.shotSpeed;
    this.range = data.range;
    this.fireDelay = data.fireDelay;
    this.damage = data.damage;
  }

  override serialize(): PlayerData {
    const data = super.serialize() as PlayerData;

    data.state = this.state;
    data.speed = this.speed;
    data.angularSpeed = this.angularSpeed;
    data.shotSpeed = this.shotSpeed;
    data.range = this.range;
    data.fireDelay = this.fireDelay;
    data.damage = this.damage;

    return data;
  }
}
