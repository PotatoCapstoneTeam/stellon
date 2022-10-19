import Phaser from 'phaser';
import React from 'react';
import { useEffect, useRef } from 'react';
import { MainScene } from './scenes/main-scene';

/* eslint-disable-next-line */
export interface RendererProps {}

export const Renderer = (props: RendererProps) => {
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
      scene: [new MainScene('nickname')],
    });

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={parentRef}></div>;
};
