import { Player, PlayerData } from '@stellon/game-core';
import cuid from 'cuid';

import { ClientState } from '../managers/client-manager';
import { ServerScene } from '../scenes/server-scene';
import { ServerBullet } from './server-bullet';

export interface ServerPlayerData extends PlayerData {
  userId: number;
  client: ClientState;
}

export class ServerPlayer extends Player {
  userId: number;
  client: ClientState;

  private prevFireTime = 0;

  private constructor(scene: ServerScene, data: ServerPlayerData) {
    super(cuid(), scene, data);

    this.userId = data.userId;
    this.client = data.client;

    this.onDeath = (entity, killer) => {
      const player = entity as ServerPlayer;

      player.status = 'DEATH';
      this.client.death++;

      if (killer instanceof ServerPlayer) {
        killer.client.kill++;
      }

      scene.emitKill(entity, killer);

      setTimeout(() => {
        player.status = 'LIVE';
        player.hp = player.maxHp;

        if (player.team === 'RED_TEAM') {
          player.setX(150);
          player.setY(320);
          player.setAngle(0);
        } else {
          player.setX(1050);
          player.setY(320);
          player.setAngle(180);
        }
      }, 3000);
    };
  }

  static create(
    scene: ServerScene,
    data: Omit<
      ServerPlayerData,
      | 'hp'
      | 'maxHp'
      | 'status'
      | 'speed'
      | 'angularSpeed'
      | 'fireDelay'
      | 'damage'
    >
  ) {
    return new ServerPlayer(scene, {
      ...data,
      hp: 200,
      maxHp: 200,
      status: 'LIVE',
      speed: 10,
      angularSpeed: 10,
      fireDelay: 500,
      damage: 50,
    });
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.setVelocity(0, 0);
    this.setAngularVelocity(0);

    if (this.status === 'DEATH') {
      return;
    }

    this.setAngularVelocity(
      this.client.horizontalAxis * this.angularSpeed * delta
    );

    this.scene.physics.velocityFromAngle(
      this.angle,
      this.client.verticalAxis * this.speed * delta,
      this.body?.velocity
    );

    if (this.client.fire && time - this.prevFireTime >= this.fireDelay) {
      this.prevFireTime = time;

      new ServerBullet(this.scene as ServerScene, {
        x: this.x,
        y: this.y,
        team: this.team,
        sourceId: this.id,
        damage: this.damage,
        speed: 1000,
        angle: this.angle,
        lifeTime: 400,
      });
    }
  }
}
