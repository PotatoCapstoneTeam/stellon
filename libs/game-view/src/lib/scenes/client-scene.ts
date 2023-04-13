import { PlayerManager } from './../managers/user-manager';
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import {
  Bullet,
  EntityData,
  EntityType,
  Scene,
  SERVER_FPS,
} from '@stellon/game-core';
import { GameObjects } from 'phaser';
import { ClientPlayer } from '../entities/client-player';
import { InputManager } from '../managers/input-manager';
import { ClientBullet } from '../entities/client-bullet';
import { ClientSocket } from '../client-socket';
import { ClientNexus } from '../entities/client-nexus';

export class ClientScene extends Scene {
  si: SnapshotInterpolation;
  inputManager?: InputManager;
  text?: GameObjects.Text;
  playerId?: string;
  bullets: Bullet[] = [];

  constructor(public socket: ClientSocket) {
    super({ key: 'mainScene' });

    this.si = new SnapshotInterpolation(SERVER_FPS);
  }

  preload() {
    this.load.image('redNexus', 'assets/red-nexus.png');
    this.load.image('blueNexus', 'assets/blue-nexus.png');
    this.load.image('redPlayer', 'assets/red-player.png');
    this.load.image('bluePlayer', 'assets/blue-player.png');
    this.load.image('redBullet', 'assets/red-bullet.png');
    this.load.image('blueBullet', 'assets/blue-bullet.png');
  }

  createEntity(type: EntityType, data: EntityData) {
    switch (type) {
      case EntityType.PLAYER:
        this.playerGroup.add(new ClientPlayer(this, data));
        break;
      case EntityType.BULLET:
        this.bullets.push(
          new ClientBullet(
            data.id,
            this,
            +(data['x'] ?? 0),
            +(data['y'] ?? 0),
            this.playerGroup.find((data['sourceId'] as string) ?? '')!,
            +(data['damage'] ?? 0),
            +(data['speed'] ?? 0),
            +(data['angle'] ?? 0)
          )
        );
        break;
      case EntityType.NEXUS:
        this.nexusGroup.add(new ClientNexus(this, data));
    }
  }

  override create() {
    super.create();

    this.inputManager = new InputManager(this);

    this.socket.on('welcome', (event) => {
      this.playerId = event.playerId;

      event.entities.forEach((entitiy) => {
        this.createEntity(entitiy.type, entitiy.data);
      });
    });

    this.socket.on('create', (event) => {
      this.createEntity(event.type, event.data);
    });

    this.socket.on('update', (event) => {
      this.si.snapshot.add(event.snapshot);
    });

    this.socket.on('destroy', (event) => {
      switch (event.type) {
        case EntityType.BULLET: {
          const idx = this.bullets.findIndex(
            (bullet) => bullet.id === event.id
          );

          if (idx === -1) {
            break;
          }

          const bullet = this.bullets.splice(idx, 1);

          bullet[0].destroy();

          break;
        }
      }
    });

    this.socket.emit('join', {});

    this.events.on('destroy', () => {
      this.socket.close();
    });
  }

  override update(time: number, delta: number): void {
    if (this.inputManager) {
      this.inputManager.update();

      this.socket.emit('input', {
        horizontalAxis: this.inputManager.horizontalAxis,
        verticalAxis: this.inputManager.verticalAxis,
        fire: this.inputManager.fire,
      });
    }

    const snapshot = this.si.calcInterpolation(
      'x, y, angle, speed, angularSpeed',
      'players'
    );

    const snapshot2 = this.si.calcInterpolation('', 'nexuses');

    snapshot?.state.forEach((playerData) => {
      const player = this.playerGroup.find(playerData.id);

      player?.deserialize(playerData);
    });

    snapshot2?.state.forEach((nexusData) => {
      const nexus = this.nexusGroup.find(nexusData.id);

      nexus?.deserialize(nexusData);
    });

    const player = this.playerGroup.find(this.playerId ?? '');

    if (player) {
      this.cameras.main.centerOn(player.x, player.y);
    }

    super.update(time, delta);
  }
}
