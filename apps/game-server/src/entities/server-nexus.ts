import { Nexus, NexusData, Scene } from '@stellon/game-core';
import cuid from 'cuid';

export type ServerNexusData = Omit<NexusData, 'hp'>;

export class ServerNexus extends Nexus {
  constructor(scene: Scene, data: ServerNexusData) {
    super(cuid(), scene, { ...data, hp: data.maxHp });
  }
}
