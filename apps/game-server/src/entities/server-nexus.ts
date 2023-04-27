import { Nexus, NexusData, Scene } from '@stellon/game-core';
import cuid from 'cuid';

export class ServerNexus extends Nexus {
  constructor(scene: Scene, data: NexusData) {
    super(cuid(), scene, data);
  }
}
