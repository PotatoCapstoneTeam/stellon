import { Scene } from '../scenes';
import { DamageableEntity, DamageableEntityData } from './entity';

export type NexusData = DamageableEntityData;

export class Nexus extends DamageableEntity {
  constructor(id: string, scene: Scene, data: NexusData) {
    // ...data 앞은 기본값, 뒤는 고정값
    super(id, scene, {
      name: '넥서스',
      ...data,
    });

    scene.nexusGroup.add(this);
  }
}
