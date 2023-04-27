import { Value } from '@geckos.io/snapshot-interpolation/lib/types';
import { Physics } from 'phaser';

import { Team } from '..';
import { Scene } from '../scenes/scene';

export enum EntityType {
  PLAYER,
  BULLET,
  NEXUS,
}

export interface EntityData {
  x: number;
  y: number;
  name?: string;
  team?: Team;
  texture?: string;
  angle?: number;
}

export abstract class Entity extends Physics.Arcade.Sprite {
  team: Team;

  constructor(public id: string, scene: Scene, data: EntityData) {
    let texture = data.texture;

    if (typeof texture === 'string') {
      texture = texture.replace('%', data.team === 'RED_TEAM' ? 'red' : 'blue');
    }

    super(scene, data.x, data.y, texture ?? '');

    this.name = data.name ?? '';
    this.team = data.team ?? 'NONE';
    this.angle = data.angle ?? 0;

    scene.addEntity(this);
  }

  override destroy(fromScene?: boolean | undefined): void {
    if (this.scene instanceof Scene) {
      this.scene.removeEntity(this);
    }

    super.destroy(fromScene);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);
  }

  makeData(): EntityData {
    return { ...this.serialize() };
  }

  serialize(): EntityData {
    return {
      x: this.x,
      y: this.y,
      name: this.name,
      team: this.team,
      angle: this.angle,
    };
  }

  deserialize(data: { [key: string]: Value }) {
    for (const key in data) {
      if (key === 'id') {
        continue;
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[key] = data[key];
    }
  }
}

export type DeathCallback = (entity: DamageableEntity, killer: Entity) => void;

export interface DamageableEntityData extends EntityData {
  team: Team;
  hp: number;
  maxHp: number;
}

export abstract class DamageableEntity extends Entity {
  hp: number;
  maxHp: number;
  onDeath?: DeathCallback;

  constructor(id: string, scene: Scene, data: DamageableEntityData) {
    super(id, scene, data);

    this.hp = data.hp;
    this.maxHp = data.maxHp;
  }

  override serialize(): DamageableEntityData {
    const data = super.serialize() as DamageableEntityData;

    data.team = this.team;
    data.hp = this.hp;
    data.maxHp = this.maxHp;

    return data;
  }

  hit(damage: number, hitter: Entity): number {
    if (this.hp - damage <= 0) {
      const realDamage = damage - this.hp;

      this.hp = 0;

      (async () => {
        this.onDeath?.(this, hitter);
      })();

      return realDamage;
    } else {
      this.hp -= damage;
      return damage;
    }
  }
}
