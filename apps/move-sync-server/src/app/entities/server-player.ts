import { Data } from '@geckos.io/server';
import { Player, Scene } from '@stellon/game-core';
import { ClientState } from '../managers/client-manager';
import { ServerBullet } from './server-bullet';
import { MainScene } from '../scenes/main-scene';

export class ServerPlayer extends Player {
  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    nickname: string,
    public client: ClientState,
    public room: {
      emit: (eventName: string, data: Data) => void;
    }
  ) {
    super(id, scene, x, y, id, nickname);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.setVelocity(0, 0);
    this.setAngularVelocity(0);

    this.setAngularVelocity(
      this.client.horizontalAxis * this.angularSpeed * delta
    );

    this.scene.physics.velocityFromAngle(
      this.angle,
      this.client.verticalAxis * this.speed * delta,
      this.body.velocity
    );

    if (this.client.fire) {
      const scene = this.scene as MainScene;

      const bullet = new ServerBullet(
        this.scene as Scene,
        this.x,
        this.y,
        this,
        100,
        1000,
        this.angle,
        this.room
      );

      scene.bulletGroup.add(bullet);
    }
  }
}
