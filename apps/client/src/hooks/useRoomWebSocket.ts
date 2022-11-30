import { CompatClient, Stomp } from '@stomp/stompjs';
import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';

export interface ISend {
  type: 'JOIN' | 'ROOM' | 'START' | 'PLAY' | 'CHANGE' | 'EXIT';
  roomId: number;
  nickname: string;
}

const useRoomWebSocket = (roomId: string) => {
  const client = useRef<CompatClient>();

  useEffect(() => {
    if (!client.current) {
      const socket = new SockJS('https://stellon.shop/ws-stomp');
      client.current = Stomp.over(() => {
        return socket;
      });

      client.current.connect({}, (frame: string) => {
        console.log('룸 웹소켓 연결');

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
  }, []);

  const send = (message: ISend) => {
    if (client.current?.connected) {
      client.current.send('/pub/message', {}, JSON.stringify(message));
    }
  };

  return { send };
};

export default useRoomWebSocket;
