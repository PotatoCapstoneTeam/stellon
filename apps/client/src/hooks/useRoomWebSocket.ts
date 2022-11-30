import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { IInfo } from '../containers/LobbyPage/LobbyPage';

export interface ISend {
  type: 'JOIN' | 'ROOM' | 'START' | 'PLAY' | 'CHANGE' | 'EXIT' | 'READY';
  roomId: number;
  nickname: string;
}

const useRoomWebSocket = (roomId: string, myInfo?: IInfo) => {
  const client = useRef<CompatClient>();

  useEffect(() => {
    if (!client.current && myInfo) {
      const socket = new SockJS('https://stellon.shop/ws-stomp');
      client.current = Stomp.over(() => {
        return socket;
      });

      client.current.connect({}, (frame: string) => {
        console.log('룸 웹소켓 연결 후 조인합니다');

          send({
            type: 'JOIN',
            roomId: Number(roomId),
            nickname: myInfo.nickname,
          });

        client.current?.subscribe(`/sub/room/${roomId}`, (res) => {
          if (res != null) {
            console.log(JSON.parse(res.body));
          } else {
            console.log('none');
          }
        });
      });
    }

    return () => {
      client.current?.disconnect();
      client.current = undefined;
      console.log('룸 웹소켓 끊어짐');
    };
  }, [myInfo, roomId]);

  const send = (message: ISend) => {
    console.log('send');
    if (client.current?.connected) {
      client.current.send('/pub/message', {}, JSON.stringify(message));
    }
  };

  const ready = () => {
    console.log('준비합니다');
    if (roomId && myInfo) {
      send({
        type: 'READY',
        roomId: Number(roomId),
        nickname: myInfo.nickname,
      });
    }
  };
  
  const start = () => {
    console.log('시작합니다');
    if (roomId && myInfo) {
      send({
        type: 'START',
        roomId: Number(roomId),
        nickname: myInfo.nickname,
      });
    }
  };

  return { send, ready, start };
};

export default useRoomWebSocket;
