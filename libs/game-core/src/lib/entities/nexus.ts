import { Team } from '..';
import { Scene } from '../scenes';
import { DamageableEntity, EntityData } from './entity';

export class Nexus extends DamageableEntity {
  constructor(
    id: string,
    scene: Scene,
    x: number,
    y: number,
    public team: Team,
    texture = ''
  ) {
    super(id, scene, x, y, texture);
  }

  serialize(): EntityData {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      team: this.team,
      hp: this.hp,
    };
  }
  deserialize(data: EntityData): void {
    this.x = +(data['x'] ?? this.x);
    this.y = +(data['y'] ?? this.y);
    this.team = data['team'] === 'RED_TEAM' ? 'RED_TEAM' : 'BLUE_TEAM';
    this.hp = +(data['hp'] ?? this.hp);
  }
}
