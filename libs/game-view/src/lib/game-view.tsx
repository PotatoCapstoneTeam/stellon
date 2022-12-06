import styled from 'styled-components';
import { useEffect } from 'react';

export interface GameViewProps {
  url: string;
  token: string;
  onEnd: () => void;
}

const Div = styled.div`
  z-index: 999;
  background-color: white;
  width: 100%;
  height: 100%;
  color: white;
`;

export const GameView = (props: GameViewProps) => {
  useEffect(() => {
    setTimeout(() => {
      props.onEnd();
    }, 10000);
  });

  return (
    <Div>
      <p>{props.url}</p>
      <p>{props.token}</p>
    </Div>
  );
};
