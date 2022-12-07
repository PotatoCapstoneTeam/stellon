import { useEffect, useRef, useState } from 'react';
import { ClientScene } from './scenes/client-scene';
import { ClientSocket } from './client-socket';
import { Team } from '@stellon/game-core';

export interface GameViewProps {
  url: string;
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

    const socket = new ClientSocket(props.url, props.token);

    let game: Phaser.Game;

    socket.connect().then(() => {
      game = new Phaser.Game({
        width: 1200,
        height: 640,
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
        scene: [new ClientScene(socket)],
      });

      socket.on('end', (event) => {
        alert(`${event.victoryTeam} 승리!`);
        props.onEnd();
      });
    });

    return () => {
      socket.close();
      game.destroy(true);
    };
  }, [props, props.token, props.url]);

  return <div ref={parentRef} />;
};
