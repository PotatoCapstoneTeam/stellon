import { MapInfo } from './map-info';

export const StarMap: MapInfo = {
  name: 'Star',
  width: 1200,
  height: 640,
  respawnTime: 3000,
  red: {
    nexus: {
      x: 100,
      y: 320,
      maxHp: 2000,
    },
    spawns: [{ x: 150, y: 320, angle: 0 }],
  },
  blue: {
    nexus: {
      x: 1100,
      y: 320,
      maxHp: 2000,
    },
    spawns: [{ x: 1050, y: 320, angle: 180 }],
    turrets: [
      {
        x: 500,
        y: 320,
        maxHp: 1000,
        damage: 100,
      },
    ],
  },
};
