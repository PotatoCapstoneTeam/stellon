import { ClientChannel, Data, geckos } from '@geckos.io/client';
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import {
  Bullet,
  CreateEvent,
  DestroyEvent,
  EntityType,
  JoinEvent,
  Scene,
  SERVER_FPS,
  UpdateEvent,
  WelcomeEvent,
} from '@stellon/game-core';
import { GameObjects } from 'phaser';
import { ClientPlayer } from '../entities/client-player';
import { InputManager } from '../managers/input-manager';
import { ClientBullet } from '../entities/client-bullet';

export class ClientScene extends Scene {
  channel: ClientChannel;
  si: SnapshotInterpolation;
  inputManager?: InputManager;
  text?: GameObjects.Text;
  playerId?: string;
  bullets: Bullet[] = [];

  constructor(public nickname: string) {
    super({ key: 'mainScene' });

    this.channel = geckos();
    this.si = new SnapshotInterpolation(SERVER_FPS);
  }

  preload() {
    this.load.image('player', 'assets/player.png');
    this.load.image('otherPlayer', 'assets/other-player.png');
    this.load.image('bullet', 'assets/bullet.png');
  }

  create() {
    this.inputManager = new InputManager(this);

    this.channel.onConnect((error) => {
      if (error) {
        console.error(error.message);
        return;
      }

      this.channel.on('welcome', (data: Data) => {
        const event = data as WelcomeEvent;

        if (this.playerId || this.channel.id !== event.userId) {
          return;
        }

        this.playerId = event.playerId;
      });

      this.channel.on('create', (data: Data) => {
        const event = data as CreateEvent;

        switch (event.type) {
          case EntityType.PLAYER:
            this.enitityContainer.addPlayer(
              new ClientPlayer(
                this,
                this.playerId === event.data.id,
                event.data
              )
            );
            break;
          case EntityType.BULLET:
            this.bullets.push(
              new ClientBullet(
                event.data.id,
                this,
                +(event.data['x'] ?? 0),
                +(event.data['y'] ?? 0),
                this.enitityContainer.findPlayer(
                  (event.data['source'] as string) ?? ''
                )!,
                +(event.data['damage'] ?? 0),
                +(event.data['speed'] ?? 0),
                +(event.data['angle'] ?? 0)
              )
            );
            break;
        }
      });

      this.channel.on('update', (data: Data) => {
        const event = data as UpdateEvent;

        this.si.snapshot.add(event.snapshot);
      });

      this.channel.on('destroy', (data: Data) => {
        const event = data as DestroyEvent;

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

      this.channel.emit('join', { nickname: this.nickname } as JoinEvent);
    });

    this.events.on('destroy', () => {
      this.channel.close();
    });
  }

  override update(time: number, delta: number): void {
    if (this.inputManager) {
      this.inputManager.update();
      this.inputManager.emit(this.channel);
    }

    super.update(time, delta);

    const snapshot = this.si.calcInterpolation(
      'x, y, angle, speed, angularSpeed',
      'players'
    );

    snapshot?.state.forEach((playerData) => {
      const player = this.enitityContainer.findPlayer(playerData.id);

      player?.deserialize(playerData);
    });
  }
}
