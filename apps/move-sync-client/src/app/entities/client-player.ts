import { GameObjects } from 'phaser';
import { Player, Scene, EntityData } from '@stellon/game-core';
import { MainScene } from '../scenes/main-scene';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';

export interface IClientEntity {
  updateFromServer(state: State, time: number, delta: number): void;
}

export class ClientPlayer extends Player {
  label: GameObjects.Text;

  constructor(scene: Scene, public isLocal: boolean, data: EntityData) {
    super(
      data.id,
      scene,
      +(data['x'] ?? 0),
      +(data['y'] ?? 0),
      data['nickname'] + '',
      isLocal ? 'player' : 'otherPlayer'
    );

    this.scale = 2;

    this.label = new GameObjects.Text(
      scene,
      this.x,
      this.y,
      data['nickname'] + '',
      {
        fontSize: '12',
        align: 'center',
      }
    );
    this.label.setDisplayOrigin(0, -20);
    scene.add.existing(this.label);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    (this.scene as MainScene).si.calcInterpolation('x y', 'players');

    // this.setVelocity(0, 0);
    // this.setAngularVelocity(0);

    // if (this.scene.input.keyboard.checkDown(this.keys.fire, 250)) {
    //   new ClientBullet(this.scene as Scene, this.x, this.y, 1000, this.angle);
    // }

    this.label.setPosition(this.x, this.y);
  }
}
