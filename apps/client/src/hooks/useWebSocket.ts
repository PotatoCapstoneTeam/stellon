import { Stomp } from '@stomp/stompjs';
import { useState } from 'react';
import SockJS from 'sockjs-client';

interface IUser {
  id: number;
  nickname: string;
}
interface IMessage {
  roomId: number;
  user: IUser;
  message: string;
}

interface IChat {
  nickname: string;
  message: string;
}
const useWebSocket = () => {
  const [lobbyChat, setLobbyChat] = useState<any>([]);
  const socket = new SockJS('https://stellon.shop/ws-stomp');
  const stompClient = Stomp.over(() => {
    return socket;
  });

  const connect = () => {
    stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/sub/lobby', (res) => {
        if (res != null) {
          console.log(JSON.parse(res.body));
          // setLobbyChat((prev: any) => [...prev, res.body]);
          // console.log(lobbyChat);
        } else {
          console.log('none');
        }
      });
    });
  };

  const send = () => {
    const chatting: IMessage = {
      roomId: 1,
      user: { id: 1, nickname: 'test' },
      message: 'tsetF',
    };
    if (stompClient) {
      stompClient.send('/pub/chat', {}, JSON.stringify(chatting));
    }
  };

  return { connect, send, stompClient };
};

export default useWebSocket;
