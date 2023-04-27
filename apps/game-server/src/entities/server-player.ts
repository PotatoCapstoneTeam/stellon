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

  prevFireTime = 0;

  private constructor(scene: ServerScene, data: ServerPlayerData) {
    super(cuid(), scene, data);

    this.setCollideWorldBounds(true);

    this.userId = data.userId;
    this.client = data.client;

    this.onDeath = (entity, killer) => {
      const player = entity as ServerPlayer;

      player.state = 'Death';
      this.client.death++;

      if (killer instanceof ServerPlayer) {
        killer.client.kill++;
      }

      scene.emitKill(entity, killer);

      setTimeout(() => {
        player.state = 'Live';
        player.hp = player.maxHp;

        const spawn = scene.getSpawn(this.team);

        player.setX(spawn.x);
        player.setY(spawn.y);
        player.setAngle(spawn.angle);
      }, scene.map.respawnTime);
    };
  }

  static create(
    scene: ServerScene,
    data: Omit<
      ServerPlayerData,
      | 'hp'
      | 'maxHp'
      | 'state'
      | 'speed'
      | 'angularSpeed'
      | 'shotSpeed'
      | 'range'
      | 'fireDelay'
      | 'damage'
    >
  ) {
    return new ServerPlayer(scene, {
      ...data,
      hp: 200,
      maxHp: 200,
      state: 'Live',
      speed: 10,
      angularSpeed: 10,
      shotSpeed: 1000,
      range: 300,
      fireDelay: 500,
      damage: 50,
    });
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.setVelocity(0, 0);
    this.setAngularVelocity(0);

    if (this.state === 'Death') {
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
        angle: this.angle,
        team: this.team,
        sourceId: this.id,
        damage: this.damage,
        speed: this.shotSpeed,
        range: this.range,
      });
    }
  }
}
