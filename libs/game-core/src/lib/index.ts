import { Snapshot } from '@geckos.io/snapshot-interpolation/lib/types';
import { EntityData, EntityType } from './entities';

export * from './entities';
export * from './scenes/scene';

export const SERVER_FPS = 30;

// Client Event

export type JoinEvent = {
  nickname: string;
};

export type InputEvent = {
  horizontalAxis: number;
  verticalAxis: number;
};

// Server Event

export type WelcomeEvent = {
  userId: string;
  playerId: string;
};

export type CreateEvent = {
  type: EntityType;
  data: EntityData;
};

export type UpdateEvent = {
  snapshot: Snapshot;
};
