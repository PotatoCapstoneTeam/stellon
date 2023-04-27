import { Bullet, Entity, Group, Nexus, Player } from '../entities';

export class Scene extends Phaser.Scene {
  private entities: Entity[] = [];

  nexusGroup!: Group<Nexus>;
  playerGroup!: Group<Player>;
  bulletGroup!: Group<Bullet>;

  constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
    super(config);
  }

  create() {
    this.nexusGroup = new Group(this);
    this.playerGroup = new Group(this);
    this.bulletGroup = new Group(this);
  }

  override update(time: number, delta: number): void {
    super.update(time, delta);

    this.entities.forEach((object) => {
      if (!object.active) {
        return;
      }

      object.update(time, delta);
    });
  }

  findEntity(id: string): Entity | undefined {
    return this.entities.find((value) => value.id === id);
  }

  addEntity(entity: Entity) {
    this.entities.push(entity);

    this.add.existing(entity);
    this.physics.add.existing(entity);
  }

  removeEntity(entity: Entity) {
    const index = this.entities.findIndex((value) => value === entity);

    this.entities.splice(index, 1);
  }
}
