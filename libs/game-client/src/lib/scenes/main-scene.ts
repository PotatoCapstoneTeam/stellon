import { GameObjects } from 'phaser';
import { Player } from '../entities/player';

export class MainScene extends Phaser.Scene {
  #updateList: GameObjects.GameObject[] = [];
  #player?: Player;
  bullets?: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: 'mainScene' });
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.bullets = this.physics.add.group();
    this.#player = new Player({ scene: this, x: 200, y: 200 }, this.bullets!);

    const dummy = this.physics.add.group();
    dummy.add(this.physics.add.sprite(400, 400, 'player'));
    dummy.add(this.physics.add.sprite(400, 500, 'player'));

    setTimeout(() => {
      dummy.add(this.physics.add.sprite(400, 600, 'player'));
    }, 1000);

    this.physics.add.overlap(dummy, this.bullets, (dummy, bullet) => {
      bullet.destroy();
      console.log('test');
    });
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
