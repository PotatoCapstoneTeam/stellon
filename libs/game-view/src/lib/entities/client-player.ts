import { GameObjects } from 'phaser';
import { Player, PlayerData } from '@stellon/game-core';
import { ClientScene } from '../scenes/client-scene';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';

export interface IClientEntity {
  updateFromServer(state: State, time: number, delta: number): void;
}

export class ClientPlayer extends Player {
  playerLabel: GameObjects.Text;
  hpLabel: GameObjects.Text;

  constructor(id: string, scene: ClientScene, data: PlayerData) {
    super(id, scene, {
      ...data,
      texture: '%Player',
    });

    this.scale = 1.5;

    this.playerLabel = new GameObjects.Text(scene, this.x, this.y, this.name, {
      fontSize: '12',
      align: 'center',
    });
    this.playerLabel.setDisplayOrigin(0, -20);
    scene.add.existing(this.playerLabel);

    this.hpLabel = new GameObjects.Text(scene, this.x, this.y, this.hp + '', {
      fontSize: '12',
      align: 'center',
    });
    this.hpLabel.setDisplayOrigin(0, 20);
    scene.add.existing(this.hpLabel);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.playerLabel.setPosition(this.x, this.y);

    this.hpLabel.text = this.hp + '';
    this.hpLabel.setPosition(this.x, this.y);

    if (this.state === 'Live') {
      this.alpha = 1;
    } else {
      this.alpha = 0.5;
    }
  }
}
