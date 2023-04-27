import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import {
  BulletData,
  EntityData,
  EntityType,
  NexusData,
  PlayerData,
  Scene,
  SERVER_FPS,
  TurretData,
} from '@stellon/game-core';
import { GameObjects } from 'phaser';

import { ClientSocket } from '../client-socket';
import { ClientBullet } from '../entities/client-bullet';
import { ClientNexus } from '../entities/client-nexus';
import { ClientPlayer } from '../entities/client-player';
import { ClientTurret } from '../entities/client-turret';
import { InputManager } from '../managers/input-manager';

export class ClientScene extends Scene {
  si: SnapshotInterpolation;
  inputManager?: InputManager;
  text?: GameObjects.Text;
  playerId!: string;

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
    this.load.image('redTurret', 'assets/red-turret.png');
    this.load.image('blueTurret', 'assets/blue-turret.png');
  }

  createEntity(id: string, type: EntityType, data: EntityData) {
    switch (type) {
      case EntityType.Player:
        new ClientPlayer(id, this, data as PlayerData);
        break;
      case EntityType.Bullet:
        new ClientBullet(id, this, data as BulletData);
        break;
      case EntityType.Nexus:
        new ClientNexus(id, this, data as NexusData);
        break;
      case EntityType.Turret:
        new ClientTurret(id, this, data as TurretData);
        break;
    }
  }

  override create() {
    super.create();

    this.inputManager = new InputManager(this);

    const background = this.add.grid(
      1200 / 2,
      640 / 2,
      1200,
      640,
      32,
      32,
      0,
      0,
      0xffffff,
      0.1
    );

    this.socket.on('welcome', (event) => {
      this.playerId = event.playerId;

      event.entities.forEach((entitiy) => {
        this.createEntity(entitiy.id, entitiy.type, entitiy.data);
      });
    });

    this.socket.on('create', (event) => {
      this.createEntity(event.id, event.type, event.data);
    });

    this.socket.on('update', (event) => {
      this.si.snapshot.add(event.snapshot);
    });

    this.socket.on('destroy', (event) => {
      switch (event.type) {
        case EntityType.Bullet: {
          const bullet = this.bulletGroup.find(event.id);

          if (bullet) {
            this.bulletGroup.remove(bullet);
          }

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

    const playerSnapshot = this.si.calcInterpolation(
      'x, y, angle, speed, angularSpeed',
      'player'
    );

    playerSnapshot?.state.forEach((playerData) => {
      const player = this.playerGroup.find(playerData.id);

      player?.deserialize(playerData);
    });

    const nexusSnapshot = this.si.calcInterpolation('', 'nexus');

    nexusSnapshot?.state.forEach((nexusData) => {
      const nexus = this.nexusGroup.find(nexusData.id);

      nexus?.deserialize(nexusData);
    });

    const turretSnapshot = this.si.calcInterpolation('', 'turret');

    turretSnapshot?.state.forEach((turretData) => {
      const turret = this.turretGroup.find(turretData.id);

      turret?.deserialize(turretData);
    });

    const player = this.playerGroup.find(this.playerId);

    if (player) {
      this.cameras.main.centerOn(player.x, player.y);
    }

    super.update(time, delta);
  }
}
