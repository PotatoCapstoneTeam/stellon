import { Value } from '@geckos.io/snapshot-interpolation/lib/types';
import { Math, Physics, Textures } from 'phaser';
import { Scene } from '../scenes/scene';

export enum EntityType {
  PLAYER,
  BULLET,
  NEXUS,
}

export type EntityData = {
  id: string;
  [key: string]: Value;
};

export interface EntityProps {
  x: number;
  y: number;
  texture?: string | Textures.Texture;
}

export abstract class Entity extends Physics.Arcade.Sprite {
  constructor(public id: string, scene: Scene, props: EntityProps) {
    super(scene, props.x, props.y, props.texture ?? '');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.addUpdate(this);
  }

  override destroy(fromScene?: boolean | undefined): void {
    if (this.scene instanceof Scene) {
      this.scene.removeUpdate(this);
    }

    super.destroy(fromScene);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);
  }

  abstract serialize(): EntityData;

  abstract deserialize(data: EntityData): void;
}

export abstract class DamageableEntity extends Entity {
  hp = 2000;
  maxHp = 2000;

  onDeath?: (entity: DamageableEntity, killer: Entity) => void;

  constructor(id: string, scene: Scene, props: EntityProps) {
    super(id, scene, props);
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
