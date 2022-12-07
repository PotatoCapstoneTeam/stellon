import { Nexus, EntityData, Scene } from '@stellon/game-core';
import { GameObjects } from 'phaser';

export class ClientNexus extends Nexus {
  hpLabel: GameObjects.Text;

  constructor(scene: Scene, data: EntityData) {
    const team = data['team'] === 'RED_TEAM' ? 'RED_TEAM' : 'BLUE_TEAM';

    super(
      data.id,
      scene,
      +(data['x'] ?? 0),
      +(data['y'] ?? 0),
      team,
      team === 'RED_TEAM' ? 'redNexus' : 'blueNexus'
    );

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
