import { Stomp, Client } from '@stomp/stompjs';
import StompJs from '@stomp/stompjs';
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
        // setLobbyChat((prev: any) => [...prev, res.body]);
        // console.log(lobbyChat);
      } else {
        console.log('none');
      }
    });
  });

  const send = (chatting: IMessage) => {
    stompClient.send('/pub/chat', {}, JSON.stringify(chatting));
  };

  return { send, stompClient };
};

export default useLobbyWebSocket;
