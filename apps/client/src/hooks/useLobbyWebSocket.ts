import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useState } from 'react';

interface IUser {
  id: number;
  nickname: string;
}
interface IMessage {
  roomId: number;
  user: IUser;
  message: string;
}

const useLobbyWebSocket = () => {
  const [lobbyChat, setLobbyChat] = useState<any>([]);
  const socket = new SockJS('https://stellon.shop/ws-stomp');
  const stompClient = Stomp.over(() => {
    return socket;
  });

  stompClient.connect({}, (frame: string) => {
    console.log('Connected: ' + frame);

    stompClient.subscribe('/sub/lobby', (res) => {
      if (res != null) {
        console.log(JSON.parse(res.body));
        setLobbyChat((prev: any) => [...prev, JSON.parse(res.body)]);
        console.log(lobbyChat);
      } else {
        console.log('none');
      }
    });
  });

  const send = (chatting: IMessage) => {
    stompClient.send('/pub/chat', {}, JSON.stringify(chatting));
  };

  return { send, stompClient, lobbyChat };
};

export default useLobbyWebSocket;
