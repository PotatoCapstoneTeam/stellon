import { Team } from '..';
import { Scene } from '../scenes/scene';
import { DamageableEntity, EntityData } from './entity';

export type PlayerStatus = 'LIVE' | 'DEATH';

export class Player extends DamageableEntity {
  speed = 10;
  angularSpeed = 10;
  fireDelay = 1000;

  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    public nickname: string,
    public team: Team,
    public status: PlayerStatus,
    texture = ''
  ) {
    super(id, scene, x, y, texture);

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
