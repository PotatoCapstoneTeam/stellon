import { Input } from 'phaser';
import { Scene } from '@stellon/game-core';

const KeyCodes = Input.Keyboard.KeyCodes;

type PlayerKeys = {
  left: Input.Keyboard.Key;
  right: Input.Keyboard.Key;
  up: Input.Keyboard.Key;
  down: Input.Keyboard.Key;
  fire: Input.Keyboard.Key;
};

export class InputManager {
  keys: PlayerKeys;
  horizontalAxis = 0;
  verticalAxis = 0;
  fire = false;

  constructor(public scene: Scene) {
    this.keys = scene.input.keyboard?.addKeys({
      left: KeyCodes.LEFT,
      right: KeyCodes.RIGHT,
      up: KeyCodes.UP,
      down: KeyCodes.DOWN,
      fire: KeyCodes.SPACE,
    }) as PlayerKeys;
  }

  update() {
    this.horizontalAxis = -this.keys.left.isDown + +this.keys.right.isDown;
    this.verticalAxis = +this.keys.up.isDown + -this.keys.down.isDown;
    this.fire = this.keys.fire.isDown;
  }
}
