export type MapInfo = {
  name: string;
  width: number;
  height: number;
  respawnTime: number;
  red: TeamInfo;
  blue: TeamInfo;
};

export type TeamInfo = {
  nexus: NexusInfo;
  spawns: SpawnInfo[];
  turrets?: TurretInfo[];
};

export type NexusInfo = {
  x: number;
  y: number;
  maxHp: number;
};

export type SpawnInfo = {
  x: number;
  y: number;
  angle: number;
};

export type TurretInfo = {
  x: number;
  y: number;
  maxHp: number;
  damage: number;
};
