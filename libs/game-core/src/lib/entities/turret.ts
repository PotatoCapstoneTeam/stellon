import { Physics } from 'phaser';
import { Scene } from '../scenes';
import { DamageableEntity, DamageableEntityData, EntityType } from './entity';

export interface TurretData extends DamageableEntityData {
  shotSpeed: number;
  range: number;
  detectionRange: number;
  fireDelay: number;
  damage: number;
}

export class Turret extends DamageableEntity {
  shotSpeed: number;
  range: number;
  detectionRange: number;
  fireDelay: number;
  damage: number;

  constructor(id: string, scene: Scene, data: TurretData) {
    super(id, EntityType.Turret, scene, {
      name: '터렛',
      ...data,
    });

    scene.turretGroup.add(this);

    this.shotSpeed = data.shotSpeed;
    this.range = data.range;
    this.detectionRange = data.detectionRange;
    this.fireDelay = data.fireDelay;
    this.damage = data.damage;
  }

  override serialize(): TurretData {
    const data = super.serialize() as TurretData;

    data.shotSpeed = this.shotSpeed;
    data.range = this.range;
    data.detectionRange = this.detectionRange;
    data.fireDelay = this.fireDelay;
    data.damage = this.damage;

    return data;
  }
}
