import '@geckos.io/phaser-on-nodejs';
import { SERVER_FPS } from '@stellon/game-core';
import { MainScene } from './scenes/main-scene';

global.phaserOnNodeFPS = SERVER_FPS;

export const game = new Phaser.Game({
  type: Phaser.HEADLESS,
  banner: false,
  audio: { noAudio: true },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 },
    },
  },
  fps: {
    target: SERVER_FPS,
  },
  scene: [MainScene],
});
