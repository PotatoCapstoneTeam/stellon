import { Input } from 'phaser';
import { Bullet } from './bullet';
import { Entity, EntityConfig } from './entity';
import { MainScene } from '../scenes/main-scene';

type PlayerKeys = {
  left: Input.Keyboard.Key;
  right: Input.Keyboard.Key;
  up: Input.Keyboard.Key;
  down: Input.Keyboard.Key;
  fire: Input.Keyboard.Key;
};

export type PlayerConfig = EntityConfig;

export class Player extends Entity {
  #keys: PlayerKeys;
  #speed = 400;
  #angularSpeed = 200;

  constructor(config: PlayerConfig) {
    super('player', config);
    this.scale = 2;

    const KeyCodes = Input.Keyboard.KeyCodes;

    this.#keys = this.scene.input.keyboard.addKeys({
      left: KeyCodes.A,
      right: KeyCodes.D,
      up: KeyCodes.W,
      down: KeyCodes.S,
      fire: KeyCodes.SPACE,
    }) as PlayerKeys;
  }

  override update(...args: any[]): void {
    this.setVelocity(0, 0);
    this.setAngularVelocity(0);

    if (this.#keys.left.isDown) {
      this.setAngularVelocity(-this.#angularSpeed);
    } else if (this.#keys.right.isDown) {
      this.setAngularVelocity(this.#angularSpeed);
    }

    if (this.#keys.up.isDown) {
      this.scene.physics.velocityFromAngle(
        this.angle,
        this.#speed,
        this.body.velocity
      );
    } else if (this.#keys.down.isDown) {
      this.scene.physics.velocityFromAngle(
        this.angle,
        -this.#speed,
        this.body.velocity
      );
    }

    if (this.scene.input.keyboard.checkDown(this.#keys.fire, 250)) {
      new Bullet({
        angle: this.angle,
        scene: this.scene as MainScene,
        speed: 1000,
        x: this.x,
        y: this.y,
      });
    }
  }
}
