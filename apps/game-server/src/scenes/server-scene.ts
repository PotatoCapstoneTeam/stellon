import { SnapshotInterpolation } from '@geckos.io/snapshot-interpolation';
import { State } from '@geckos.io/snapshot-interpolation/lib/types';
import {
  DamageableEntity,
  Entity,
  EntityData,
  EntityType,
  Group,
  MapInfo,
  Scene,
  Score,
  StarMap,
  Team,
  TeamInfo,
  User,
  UserRecord,
} from '@stellon/game-core';

import { ServerBullet } from '../entities/server-bullet';
import { ServerNexus } from '../entities/server-nexus';
import { ServerPlayer } from '../entities/server-player';
import { ServerTurret } from '../entities/server-turret';
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
    public onEnd: (team: Team, users: UserRecord[]) => void,
    public map: MapInfo = StarMap
  ) {
    super({ key: 'mainScene' });
  }

  override async create() {
    super.create();

    this.setupMap();
    this.setupPhysics();

    this.onCreate?.();
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.emitUpdate();
  }

  getSpawn(team: Team) {
    const spawns =
      team === 'RED_TEAM' ? this.map.red.spawns : this.map.blue.spawns;

    return spawns[Math.floor(Math.random() * spawns.length)];
  }

  setupMap() {
    this.setupTeam(
      this.map.red,
      'RED_TEAM',
      this.users.filter((user) => user.team === 'RED_TEAM')
    );

    this.setupTeam(
      this.map.blue,
      'BLUE_TEAM',
      this.users.filter((user) => user.team === 'BLUE_TEAM')
    );
  }

  setupTeam(info: TeamInfo, team: Team, users: User[]) {
    const nexus = new ServerNexus(this, {
      team,
      x: info.nexus.x,
      y: info.nexus.y,
      maxHp: info.nexus.maxHp,
    });

    nexus.onDeath = (entity: DamageableEntity) => {
      if (this.isEnd) {
        return;
      }
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

      this.onEnd(entity.team, userRecords);
    };

    if (info.turrets) {
      for (const turretInfo of info.turrets) {
        new ServerTurret(this, {
          team,
          x: turretInfo.x,
          y: turretInfo.y,
          hp: turretInfo.maxHp,
          maxHp: turretInfo.maxHp,
          shotSpeed: 250,
          range: 1000,
          detectionRange: 300,
          fireDelay: 200,
          damage: turretInfo.damage,
        });
      }
    }

    users.forEach((user, index) => {
      const spawn = info.spawns[index % info.spawns.length];

      ServerPlayer.create(this, {
        team,
        x: spawn.x,
        y: spawn.y,
        angle: spawn.angle,
        name: user.nickname,
        userId: user.id,
        client: this.clientManager.getClient(user.id),
      });
    });
  }

  setupPhysics() {

    const bulletPhysics: ArcadePhysicsCallback = (target, bullet) => {
      const targetEntity = target as DamageableEntity;
      const { damage, source } = bullet as ServerBullet;

      if (
        targetEntity.team === source?.team ||
        targetEntity.state === 'Death'
      ) {
        return;
      }

      const hitDamage = targetEntity.hit(damage, source);

      if (source instanceof ServerPlayer) {
        switch (targetEntity.entityType) {
          case EntityType.Player:
            source.client.damageDealtToPlayer += hitDamage;
            break;
          case EntityType.Nexus:
            source.client.damageDealtToNexus += hitDamage;
            break;
          case EntityType.Turret:
            source.client.damageDealtToTurret += hitDamage;
            break;
        }
      }

      this.bulletGroup.remove(bullet as ServerBullet);
    };

    this.physics.add.overlap(this.playerGroup, this.bulletGroup, bulletPhysics);
    this.physics.add.overlap(this.nexusGroup, this.bulletGroup, bulletPhysics);
    this.physics.add.overlap(this.turretGroup, this.bulletGroup, bulletPhysics);
  }

  connection(channel: ServerChannel) {
    channel.on('join', () => {
      this.emitWelcome(channel);
    });

    channel.on('input', (event) => {
      const client = this.clientManager.getClient(channel.id);

      client.horizontalAxis = event.horizontalAxis;
      client.verticalAxis = event.verticalAxis;
      client.fire = event.fire;
    });
  }

  emitWelcome(channel: ServerChannel) {
    console.log(`'${channel.nickname}'님이 ${channel.stageId}로 접속했습니다.`);

    const entities: {
      id: string;
      type: EntityType;
      data: EntityData;
    }[] = [];

    const pushEntity = (entity: Entity) => {
      entities.push({
        id: entity.id,
        type: entity.entityType,
        data: entity.serialize(),
      });
    };

    let playerId = '';

    this.playerGroup.forEach((player) => {
      pushEntity(player);

      if ((player as ServerPlayer).userId === channel.id) {
        playerId = player.id;
      }
    });
    this.bulletGroup.forEach(pushEntity);
    this.nexusGroup.forEach(pushEntity);
    this.turretGroup.forEach(pushEntity);

    channel.emit('welcome', {
      playerId,
      entities,
      users: this.users,
    });
  }

  emitUpdate() {
    const worldState: { [key in EntityType]: State } = {
      [EntityType.Nexus]: [],
      [EntityType.Player]: [],
      [EntityType.Turret]: [],
      [EntityType.Bullet]: [],
    };

    const pushEntity = (entity: Entity) => {
      worldState[entity.entityType].push({
        id: entity.id,
        ...entity.serialize(),
      });
    };

    this.playerGroup.forEach(pushEntity);
    this.nexusGroup.forEach(pushEntity);
    this.turretGroup.forEach(pushEntity);

    const snapshot = this.si.snapshot.create(worldState);

    this.room.emit('update', { snapshot });
  }

  emitKill(entity: DamageableEntity, killer?: Entity) {
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
      killer: killer?.name,
      killerId: killer?.id,
      killerType: killer?.entityType,
      score,
    });
  }
}
