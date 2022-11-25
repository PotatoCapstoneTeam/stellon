import { useEffect, useRef } from 'react';
import { ClientScene } from './scenes/main-scene';

export interface GameViewProps {
  url: string;
  id: string;
  token: string;
  onEnd: () => void;
}

export const GameView = (props: GameViewProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = parentRef.current;

    if (!parent) {
      return;
    }

    // const nickname = prompt('닉네임을 입력해주세요!') ?? '';

    const game = new Phaser.Game({
      antialias: false,
      parent: parent,
      backgroundColor: '#212123',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 0 },
        },
      },
      scene: [new ClientScene('nickname')],
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={parentRef}></div>;
};
