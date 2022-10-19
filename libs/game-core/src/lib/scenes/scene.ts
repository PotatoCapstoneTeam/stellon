import { GameObjects } from 'phaser';

export class Scene extends Phaser.Scene {
  private updateList: GameObjects.GameObject[] = [];

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.updateList.forEach((object) => object.update(time, delta));
  }

  addUpdate(object: GameObjects.GameObject) {
    this.updateList.push(object);
  }

  removeUpdate(object: GameObjects.GameObject) {
    const index = this.updateList.findIndex((value) => value === object);

    this.updateList.splice(index, 1);
  }
}
