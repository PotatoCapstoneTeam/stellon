import { Player, Scene } from '@stellon/game-core';
import { ClientState } from '../managers/client-manager';

export class ServerPlayer extends Player {
  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    nickname: string,
    public client: ClientState
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
  }
}
