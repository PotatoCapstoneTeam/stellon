import { CompatClient, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useState, useEffect, useRef } from 'react';
import { IChat } from '../components/ChatRoom';
import { useNavigate } from 'react-router-dom';

interface IUser {
  nickname: string;
}
interface IMessage {
  roomId: number;
  user: IUser;
  message: string;
}

const useChatWebSocket = (state: string, roomId: string) => {
  const [lobbyChat, setLobbyChat] = useState<IChat[]>([]);
  const navigate = useNavigate();
  const client = useRef<CompatClient>();

  useEffect(() => {
    // 로비 채팅 또는 게임룸 채팅 구독
    const url = state === 'lobby' ? `/sub/lobby` : `/sub/room/${roomId}`;
    if (!client.current) {
      const socket = new SockJS(
        `${process.env['NX_MAIN_SERVER_URL'] ?? ''}/ws-stomp`
      );
      client.current = Stomp.over(() => {
        return socket;
      });

      client.current.connect({}, (frame: string) => {
        console.log('채팅 웹소켓 연결');

        client.current?.subscribe(url, (res) => {
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
      client.current?.disconnect(async () => {
        client.current = undefined;
        console.log('채팅 웹소켓 끊어짐');
      });
    };
  }, []);

  const send = (chatting: IMessage) => {
    if (client.current?.connected) {
      client.current.send('/pub/chat', {}, JSON.stringify(chatting));
    }
  };

  return { send, lobbyChat };
};

export default useChatWebSocket;
