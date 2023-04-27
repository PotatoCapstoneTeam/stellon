import { Nexus, Scene, NexusData } from '@stellon/game-core';
import { GameObjects } from 'phaser';

export class ClientNexus extends Nexus {
  hpLabel: GameObjects.Text;

  constructor(id: string, scene: Scene, data: NexusData) {
    super(id, scene, { ...data, texture: '%Nexus' });

    this.hpLabel = new GameObjects.Text(scene, this.x, this.y, this.hp + '', {
      fontSize: '24',
      align: 'center',
    });
    this.hpLabel.setDisplayOrigin(0, 0);
    scene.add.existing(this.hpLabel);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.hpLabel.text = this.hp + '';
  }
}
