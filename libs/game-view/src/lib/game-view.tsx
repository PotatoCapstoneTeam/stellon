import { Score } from '@stellon/game-core';
import { useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import { ClientSocket } from './client-socket';
import { ClientScene } from './scenes/client-scene';

export interface GameViewProps {
  url: string;
  token: string;
  onEnd: () => void;
}

export const GameView = (props: GameViewProps) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const [score, setScore] = useState<Score>();
  const [isShowScore, setIsShowScore] = useState(false);

  useEffect(() => {
    function onKeydown(event: KeyboardEvent) {
      if (event.key !== 'Tab') {
        return;
      }

      setIsShowScore(true);
    }

    function onKeyup(event: KeyboardEvent) {
      if (event.key !== 'Tab') {
        return;
      }

      setIsShowScore(false);
    }

    document.addEventListener('keydown', onKeydown);
    document.addEventListener('keyup', onKeyup);

    return () => {
      document.removeEventListener('keydown', onKeydown);
      document.removeEventListener('keyup', onKeyup);
    };
  }, []);

  useEffect(() => {
    const parent = parentRef.current;

    if (!parent) {
      return;
    }

    const socket = new ClientSocket(props.url, props.token);
    let isConnected = false;

    let game: Phaser.Game;

    socket.connect().then(() => {
      isConnected = true;

      game = new Phaser.Game({
        scale: {
          parent: 'game-view',
          mode: Phaser.Scale.RESIZE,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: 800,
          height: 600,
        },
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

      socket.on('welcome', (event) => {
        setScore(
          event.users.map((user) => {
            return {
              id: user.id,
              nickname: user.nickname,
              team: user.team,
              kill: 0,
              death: 0,
            };
          })
        );
      });

      socket.on('kill', (event) => {
        setScore(event.score);

        toast(`${event.killer}님이 ${event.killed}님을 죽였습니다!`);
      });

      socket.on('end', (event) => {
        toast(
          `${event.victoryTeam === 'RED_TEAM' ? '레드팀' : '블루팀'} 승리!`
        );

        setTimeout(() => props.onEnd(), 3000);
      });
    });

    return () => {
      if (isConnected) {
        socket.close();
        game.destroy(true);
      }
    };
  }, [props, props.token, props.url]);

  return (
    <div ref={parentRef} className="game-view">
      <Panel visible={isShowScore}>
        <div style={{ display: 'flex', fontWeight: 'bold' }}>
          <p style={{ width: 100, color: 'red' }}>RED</p>
          <div style={{ width: 40, textAlign: 'center' }}>킬</div>{' '}
          <div style={{ width: 40, textAlign: 'center' }}>데스</div>
        </div>

        {score
          ?.filter((value) => value.team === 'RED_TEAM')
          .map((value) => (
            <div style={{ display: 'flex' }}>
              <div style={{ width: 100 }}>{value.nickname}</div>
              <div style={{ width: 40, textAlign: 'center' }}>
                {value.kill}
              </div>{' '}
              <div style={{ width: 40, textAlign: 'center' }}>
                {value.death}
              </div>
            </div>
          ))}
        <p style={{ color: 'blue', fontWeight: 'bold' }}>blue</p>
        {score
          ?.filter((value) => value.team === 'BLUE_TEAM')
          .map((value) => (
            <div style={{ display: 'flex' }}>
              <div style={{ width: 100 }}>{value.nickname}</div>
              <div style={{ width: 40, textAlign: 'center' }}>
                {value.kill}
              </div>{' '}
              <div style={{ width: 40, textAlign: 'center' }}>
                {value.death}
              </div>
            </div>
          ))}
      </Panel>
      <Toaster />
    </div>
  );
};

const Panel = styled.div<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  flex-direction: column;
  gap: 8px;
  padding: 32px;
  border-radius: 16px;
  font-size: 16px;
  position: absolute;
  background-color: rgba(196, 219, 237, 0.879);
  backdrop-filter: blur(16px);
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
