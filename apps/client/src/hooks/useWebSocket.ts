import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useWebSocket = () => {
  const socket = new SockJS('https://stellon.shop/ws-stomp');
  const stompClient = Stomp.over(() => {
    return socket;
  });
  const connect = () => {
    stompClient.connect({}, (frame: string) => {
      console.log('Connected: ' + frame);

      stompClient.subscribe('/sub/lobby', (res) => {
        if (res != null) {
          console.log('subscribe ' + res.body);
          console.log(JSON.parse(res.body));
        } else {
          console.log('none');
        }
      });
    });
  };

  const send = () => {
    console.log('sending');
    const name = {
      roomId: 1,
      user: { id: 1, nickname: 'test' },
      message: 'testtesttesttesttesttestdsd',
    };

    stompClient.send('/pub/chat', {}, JSON.stringify(name));
  };

  return { connect, send, stompClient };
};

export default useWebSocket;
