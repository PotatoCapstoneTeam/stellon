import { ServerTurret } from './../entities/server-turret';
import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';
import {
  DamageableEntity,
  EntityData,
  EntityType,
  Scene,
  Team,
  User,
  UserRecord,
} from '@stellon/game-core';
import cuid from 'cuid';
import { ServerBullet } from '../entities/server-bullet';
import { ServerPlayer } from '../entities/server-player';
import { ClientManager } from '../managers/client-manager';
import { ServerRoom, ServerChannel } from '../server-socket';
import { ServerNexus } from '../entities/server-nexus';

export class ServerScene extends Scene {
  clientManager = new ClientManager();
  si = new SnapshotInterpolation();
  isEnd = false;

  onCreate?: VoidFunction;

  constructor(
    public room: ServerRoom,
    public users: User[],
    public onEnd: (team: Team, users: UserRecord[]) => void
  ) {
    super({ key: 'mainScene' });
  }

  onNexusDistory(entity: DamageableEntity) {
    if (this.isEnd) {
      return;
    }

    const nexus = entity as ServerNexus;

    this.isEnd = true;

    const userRecords: UserRecord[] = [];

    this.playerGroup.forEach((player) => {
      const client = (player as ServerPlayer).client;

      userRecords.push({
        userId: client.id,
        kill: client.kill,
        death: client.death,
        damageDealtToPlayer: client.damageDealtToPlayer,
        damageDealtToNexus: client.damageDealtToNexus,
      });
    });

    this.onEnd(
      nexus.team === 'RED_TEAM' ? 'BLUE_TEAM' : 'RED_TEAM',
      userRecords
    );
  }

  override async create() {
    super.create();

    this.users.forEach((user) => {
      const playerId = cuid();

      const player = new ServerPlayer(
        playerId,
        this,
        user.team === 'RED_TEAM' ? 150 : 1050,
        320,
        user.nickname,
        user.team,
        this.clientManager.getClient(user.id),
        user.id
      );

      if (user.team === 'BLUE_TEAM') {
        player.angle = 180;
      }

      // 그룹을 ServerPlayer.group으로 바꾸고 생성자에 숨기자
      this.playerGroup.add(player);
    });

    const redNexus = new ServerNexus(this, 100, 320, 'RED_TEAM');
    // const redTurret = new ServerTurret(this, 100, 320, 'RED_TEAM');
    const blueNexus = new ServerNexus(this, 1100, 320, 'BLUE_TEAM');
    // const blueTurret = new ServerTurret(this, 1100, 320, 'BLUE_TEAM');

    redNexus.onDeath = this.onNexusDistory.bind(this);
    blueNexus.onDeath = this.onNexusDistory.bind(this);

    this.nexusGroup.add(redNexus);
    this.nexusGroup.add(blueNexus);

    this.physics.add.overlap(
      this.playerGroup,
      this.bulletGroup,
      (player, bullet) => {
        const p = player as ServerPlayer;
        const b = bullet as ServerBullet;

        if (p.status === 'DEATH') {
          return;
        }

        if (!(b.source instanceof ServerPlayer)) {
          return;
        }

        if (p.team === b.source.team) {
          return;
        }

        b.source.client.damageDealtToPlayer += p.hit(b.damage, b.source);

        bullet.destroy();
      }
    );

    this.physics.add.overlap(
      this.nexusGroup,
      this.bulletGroup,
      (nexus, bullet) => {
        const n = nexus as ServerNexus;
        const b = bullet as ServerBullet;

        if (!(b.source instanceof ServerPlayer)) {
          return;
        }

        if (n.team === b.source.team) {
          return;
        }

        b.source.client.damageDealtToNexus += n.hit(b.damage, b.source);

        bullet.destroy();
      }
    );

    this.onCreate?.();
  }

  // 무조건 create 뒤에 실행 됨.
  connection(channel: ServerChannel) {
    channel.on('join', (event) => {
      console.log(
        `'${channel.nickname}'님이 ${channel.stageId}로 접속했습니다.`
      );

      const entities: {
        type: EntityType;
        data: EntityData;
      }[] = [];

      let playerId = '';

      this.playerGroup.forEach((player) => {
        entities.push({
          type: EntityType.PLAYER,
          data: player.serialize(),
        });

        if ((player as ServerPlayer).userId === channel.id) {
          playerId = player.id;
        }
      });

      this.bulletGroup.forEach((bullet) => {
        entities.push({
          type: EntityType.BULLET,
          data: bullet.serialize(),
        });
      });

      this.nexusGroup.forEach((nexus) => {
        entities.push({
          type: EntityType.NEXUS,
          data: nexus.serialize(),
        });
      });

      channel.emit('welcome', {
        playerId,
        entities,
        users: this.users,
      });
    });

    channel.on('input', (event) => {
      const client = this.clientManager.getClient(channel.id);

      client.horizontalAxis = event.horizontalAxis;
      client.verticalAxis = event.verticalAxis;
      client.fire = event.fire;
    });
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    const worldState = {
      players: [] as State,
      nexuses: [] as State,
    };

    this.playerGroup.forEach((player) => {
      worldState.players.push(player.serialize());
    });

    this.nexusGroup.forEach((nexus) => {
      worldState.nexuses.push(nexus.serialize());
    });

    const snapshot = this.si.snapshot.create(worldState);

    this.room.emit('update', { snapshot });
  }
}
