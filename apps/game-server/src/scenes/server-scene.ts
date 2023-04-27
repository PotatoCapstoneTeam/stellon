import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';
import {
  DamageableEntity,
  Entity,
  EntityData,
  EntityType,
  Group,
  Scene,
  Score,
  Team,
  User,
  UserRecord,
} from '@stellon/game-core';

import { ServerBullet } from '../entities/server-bullet';
import { ServerNexus } from '../entities/server-nexus';
import { ServerPlayer } from '../entities/server-player';
import { ClientManager } from '../managers/client-manager';
import { ServerChannel, ServerRoom } from '../server-socket';

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

  override async create() {
    super.create();

    this.users.forEach((user) => {
      const player = ServerPlayer.create(this, {
        x: user.team === 'RED_TEAM' ? 150 : 1050,
        y: 320,
        name: user.nickname,
        team: user.team,
        userId: user.id,
        client: this.clientManager.getClient(user.id),
      });

      if (user.team === 'BLUE_TEAM') {
        player.angle = 180;
      }
    });

    const redNexus = new ServerNexus(this, {
      x: 100,
      y: 320,
      team: 'RED_TEAM',
    });
    // const redTurret = new ServerTurret(this, 100, 320, 'RED_TEAM');
    const blueNexus = new ServerNexus(this, {
      x: 1100,
      y: 320,
      team: 'BLUE_TEAM',
    });
    // const blueTurret = new ServerTurret(this, 1100, 320, 'BLUE_TEAM');

    redNexus.onDeath = this.onNexusDistory.bind(this);
    blueNexus.onDeath = this.onNexusDistory.bind(this);

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

        this.bulletGroup.remove(b);
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

        this.bulletGroup.remove(b);
      }
    );

    this.onCreate?.();
  }

  // 무조건 create 뒤에 실행 됨.
  connection(channel: ServerChannel) {
    channel.on('join', () => {
      console.log(
        `'${channel.nickname}'님이 ${channel.stageId}로 접속했습니다.`
      );

      const entities: {
        id: string;
        type: EntityType;
        data: EntityData;
      }[] = [];

      let playerId = '';

      this.playerGroup.forEach((player) => {
        entities.push({
          id: player.id,
          type: EntityType.PLAYER,
          data: player.serialize(),
        });

        if ((player as ServerPlayer).userId === channel.id) {
          playerId = player.id;
        }
      });

      this.bulletGroup.forEach((bullet) => {
        entities.push({
          id: bullet.id,
          type: EntityType.BULLET,
          data: bullet.serialize(),
        });
      });

      this.nexusGroup.forEach((nexus) => {
        entities.push({
          id: nexus.id,
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
      worldState.players.push({ id: player.id, ...player.serialize() });
    });

    this.nexusGroup.forEach((nexus) => {
      worldState.nexuses.push({ id: nexus.id, ...nexus.serialize() });
    });

    const snapshot = this.si.snapshot.create(worldState);

    this.room.emit('update', { snapshot });
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

  emitKill(entity: DamageableEntity, killer: Entity) {
    const playerGroup = this.playerGroup as Group<ServerPlayer>;

    const score: Score = [];

    playerGroup.forEach(({ name, team, client }) => {
      score.push({
        id: client.id,
        nickname: name,
        team: team,
        kill: client.kill,
        death: client.death,
      });
    });

    this.room.emit('kill', {
      killed: entity.name,
      killedId: entity.id,
      killer: killer.name,
      killerId: killer.id,
      killerType: EntityType.PLAYER,
      score,
    });
  }
}
