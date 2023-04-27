import { Entity } from './entity';
import { Physics } from 'phaser';
import { Scene } from '../scenes';

export class Group<T extends Entity> extends Physics.Arcade.Group {
  private map = new Map<string, T>();

  constructor(scene: Scene) {
    super(scene.physics.world, scene);

    scene.add.existing(this);
  }

  override add(child: T, addToScene?: boolean): this {
    this.map.set(child.id, child);
    super.add(child, addToScene);

    return this;
  }

  override remove(child: T): this {
    this.map.delete(child.id);
    super.remove(child, true, true);

    return this;
  }

  find(id: string) {
    return this.map.get(id);
  }

  forEach(callbackfn: (value: T, key: string, map: Map<string, T>) => void) {
    this.map.forEach(callbackfn);
  }
}
