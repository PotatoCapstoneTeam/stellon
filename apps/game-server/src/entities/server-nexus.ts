import { Nexus, NexusData, Scene } from '@stellon/game-core';
import cuid from 'cuid';

import { NEXUS_MAX_HP } from '../constant';

export type ServerNexusData = Omit<NexusData, 'hp' | 'maxHp'>;

export class ServerNexus extends Nexus {
  constructor(scene: Scene, data: ServerNexusData) {
    super(cuid(), scene, { ...data, hp: NEXUS_MAX_HP, maxHp: NEXUS_MAX_HP });
  }
}
