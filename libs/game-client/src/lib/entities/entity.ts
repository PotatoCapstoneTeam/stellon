import { Physics, Textures } from 'phaser';
import { MainScene } from '../scenes/main-scene';

export type EntityConfig = {
  scene: MainScene;
  x: number;
  y: number;
};

export class Entity extends Physics.Arcade.Sprite {
  constructor(texture: string | Textures.Texture, config: EntityConfig) {
    super(config.scene, config.x, config.y, texture);

    config.scene.add.existing(this);
    config.scene.physics.add.existing(this);
    config.scene.addUpdate(this);
  }

  override destroy(fromScene?: boolean | undefined): void {
    super.destroy(fromScene);

    if (this.scene instanceof MainScene) {
      this.scene.removeUpdate(this);
    }
  }
}
