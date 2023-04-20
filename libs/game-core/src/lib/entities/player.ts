import { Team } from '..';
import { Scene } from '../scenes/scene';
import { DamageableEntity, EntityData, EntityProps } from './entity';

export type PlayerStatus = 'LIVE' | 'DEATH';

export interface PlayerProps extends EntityProps {
  nickname: string;
  team: Team;
  status: PlayerStatus;
}

export class Player extends DamageableEntity {
  nickname: string;
  team: Team;
  status: PlayerStatus;

  speed = 10;
  angularSpeed = 10;
  fireDelay = 500;
  damage = 50;

  constructor(id: string, scene: Scene, props: PlayerProps) {
    super(id, scene, props);

    this.nickname = props.nickname;
    this.team = props.team;
    this.status = props.status;

    this.hp = 200;
  }

  serialize(): EntityData {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      angle: this.angle,
      nickname: this.nickname,
      team: this.team,
      status: this.status,
      speed: this.speed,
      angularSpeed: this.angularSpeed,
      hp: this.hp,
    };
  }

  deserialize(data: EntityData) {
    this.x = +(data['x'] ?? this.x);
    this.y = +(data['y'] ?? this.y);
    this.angle = +(data['angle'] ?? this.angle);
    this.nickname = data['nickname'] + '';
    this.team = data['team'] === 'RED_TEAM' ? 'RED_TEAM' : 'BLUE_TEAM';
    this.status = data['status'] as any;
    this.speed = +(data['speed'] ?? this.speed);
    this.angularSpeed = +(data['angularSpeed'] ?? this.angularSpeed);
    this.hp = +(data['hp'] ?? this.hp);
  }
}
