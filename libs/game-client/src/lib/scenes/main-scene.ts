import { GameObjects } from 'phaser';
import { Player } from '../entities/player';

export class MainScene extends Phaser.Scene {
  #updateList: GameObjects.GameObject[] = [];
  #player?: Player;

  constructor() {
    super({ key: 'mainScene' });
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.#player = new Player({ scene: this, x: 200, y: 200 });
  }

  override update(time: number, delta: number): void {
    this.#updateList.forEach((object) => object.update());
  }

  addUpdate(object: GameObjects.GameObject) {
    this.#updateList.push(object);
  }

  removeUpdate(object: GameObjects.GameObject) {
    const index = this.#updateList.findIndex((value) => value === object);

    this.#updateList.splice(index, 1);
  }
}
