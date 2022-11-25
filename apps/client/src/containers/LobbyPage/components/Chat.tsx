import ChatRoom from '../../../components/ChatRoom';
import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { IInfo } from '../LobbyPage';

const Chat = (data: IInfo) => {
  return (
    <ChatBox>
      <ChatHeader>
        <ChatImg src="../assets/chat.png" alt="none" />
        <LiveChat color="black" size="12">
          실시간 채팅
        </LiveChat>
      </ChatHeader>
      <ChatRoom state="lobby" {...data} />
    </ChatBox>
  );
};

export default Chat;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 78%;
  border-radius: 0 0 0 10px;
  height: 40%;
  z-index: 99;
`;
const LiveChat = styled(Typography)`
  margin-right: 40px;
`;
const ChatImg = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;
const ChatHeader = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin: 8px 0;
`;
