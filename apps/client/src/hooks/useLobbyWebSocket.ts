import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useState, useEffect, useRef } from 'react';
import { IChat } from '../components/ChatRoom';

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
  const [lobbyChat, setLobbyChat] = useState<IChat[]>([]);
  const client = useRef<CompatClient>();

  useEffect(() => {
    if (!client.current) {
      const socket = new SockJS('https://stellon.shop/ws-stomp');
      client.current = Stomp.over(() => {
        return socket;
      });

      client.current.connect({}, (frame: string) => {
        console.log('Connected: ' + frame);

        client.current?.subscribe('/sub/lobby', (res) => {
          if (res != null) {
            console.log(JSON.parse(res.body));
            setLobbyChat((prev: IChat[]) => {
              const chat = [...prev, JSON.parse(res.body)];
              console.log(chat);
              return chat;
            });
          } else {
            console.log('none');
          }
        });
      });
    }
    return () => {
      client.current?.disconnect();
      client.current = undefined;
      console.log('웹소켓 끊어짐');
    };
  }, []);

  const send = (chatting: IMessage) => {
    if (client.current?.connected) {
      client.current.send('/pub/chat', {}, JSON.stringify(chatting));
    }
  };

  return { send, lobbyChat };
};

export default useLobbyWebSocket;
