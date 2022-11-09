import { Data, GeckosServer } from '@geckos.io/server';
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';
import {
  Scene,
  JoinEvent,
  WelcomeEvent,
  CreateEvent,
  EntityType,
  UpdateEvent,
  InputEvent,
  Stage,
} from '@stellon/game-core';
import cuid = require('cuid');
import { GameObjects } from 'phaser';
import { ServerBullet } from '../entities/server-bullet';
import { ServerPlayer } from '../entities/server-player';
import { ClientManager } from '../managers/client-manager';

const ROOM_ID = 'MAIN';

export class MainScene extends Scene {
  clientManager = new ClientManager();
  si = new SnapshotInterpolation();
  io?: GeckosServer;
  playerGroup: Phaser.Physics.Arcade.Group;
  bulletGroup: Phaser.Physics.Arcade.Group;

  constructor() {
    super({ key: 'mainScene' });
  }

  async create() {
    const geckos = await import('@geckos.io/server');
    const io = geckos.default();
    const room = io.room(ROOM_ID);

    this.playerGroup = this.physics.add.group();
    this.bulletGroup = this.physics.add.group();

    io.listen();
    io.onConnection((channel) => {
      channel.onDisconnect(() => {
        console.log(`${channel.id} got disconnected`);
      });

      channel.on('join', (data: Data) => {
        const event = data as JoinEvent;

        console.log(`got ${event.nickname} from "join"`);
        channel.join(ROOM_ID);

        const playerId = cuid();

        room.emit('welcome', {
          userId: channel.id,
          playerId: playerId,
        } as WelcomeEvent);

        this.stage.getPlayers().forEach((player) => {
          channel.emit('create', {
            type: EntityType.PLAYER,
            data: player.serialize(),
          } as CreateEvent);
        });

        const player = new ServerPlayer(
          playerId,
          this,
          200,
          200,
          event.nickname,
          this.clientManager.getClient(channel.id),
          room
        );

        this.stage.addPlayer(player);
        this.playerGroup.add(player);

        room.emit('create', {
          type: EntityType.PLAYER,
          data: player.serialize(),
        } as CreateEvent);
      });

      channel.on('input', (data: Data) => {
        const event = data as InputEvent;

        const client = this.clientManager.getClient(channel.id);

        client.horizontalAxis = event.horizontalAxis;
        client.verticalAxis = event.verticalAxis;
        client.fire = event.fire;
      });
    });

    this.io = io;

    this.physics.add.overlap(
      this.playerGroup,
      this.bulletGroup,
      (player, bullet) => {
        const p = player as ServerPlayer;
        const b = bullet as ServerBullet;

        if (p.id === b.source.id) {
          return;
        }

        p.hp -= b.damage;

        console.log(p.hp);

        bullet.destroy();
      }
    );
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    if (!this.io) {
      return;
    }

    const worldState = {
      players: [] as State,
    };

    this.stage.getPlayers().forEach((player) => {
      worldState.players.push(player.serialize());
    });

    const snapshot = this.si.snapshot.create(worldState);

    this.io.room(ROOM_ID).emit('update', { snapshot } as UpdateEvent);
  }
}
