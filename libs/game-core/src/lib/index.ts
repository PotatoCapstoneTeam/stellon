import { Snapshot } from '@geckos.io/snapshot-interpolation/lib/types';

import { EntityData, EntityType } from './entities';

export * from './entities';
export * from './maps';
export * from './scenes';

export const SERVER_FPS = 30;

export type Team = 'NONE' | 'RED_TEAM' | 'BLUE_TEAM';

export type User = {
  id: number;
  nickname: string;
  team: Team;
};

export type ApiPostRequestBody = {
  secret: string;
  callback: string;
  roomId: number;
  users: User[];
};

export type ApiPostResponseBody = {
  id: string;
  users: {
    id: number;
    token: string;
  }[];
};

export type UserRecord = {
  userId: number;
  kill: number;
  death: number;
  damageDealtToPlayer: number;
  damageDealtToNexus: number;
};

export type Score = {
  id: number;
  nickname: string;
  team: Team;
  kill: number;
  death: number;
}[];

// Client Event

export type JoinEvent = {
  //
};

export type InputEvent = {
  horizontalAxis: number;
  verticalAxis: number;
  fire: boolean;
};

export type ClientEventMap = {
  join: JoinEvent;
  input: InputEvent;
};

// Server Event

export type WelcomeEvent = {
  playerId: string;
  entities: { id: string; type: EntityType; data: EntityData }[];
  users: User[];
};

export type CreateEvent = {
  type: EntityType;
  id: string;
  data: EntityData;
};

export type UpdateEvent = {
  snapshot: Snapshot;
};

export type KillEvent = {
  killed: string;
  killedId: string;
  killer?: string;
  killerId?: string;
  killerType?: EntityType;
  score: Score;
};

export type DestroyEvent = {
  id: string;
  type: EntityType;
};

export type EndEvent = {
  victoryTeam: Team;
};

export type ServerEventMap = {
  welcome: WelcomeEvent;
  create: CreateEvent;
  update: UpdateEvent;
  kill: KillEvent;
  destroy: DestroyEvent;
  end: EndEvent;
};
