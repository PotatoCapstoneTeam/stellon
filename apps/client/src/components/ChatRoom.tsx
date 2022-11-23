import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import useLobbyWebSocket from '../hooks/useLobbyWebSocket';
import { customColor } from '../constants/customColor';
import { Typography } from './Typography';

interface IChatRoom {
  state: string;
}

const ChatRoom = ({ state }: IChatRoom) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { send } = useLobbyWebSocket();
  const [chat, setChat] = useState([]);

  // 채팅 Submit
  const submitChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current != null) {
      const chatting = {
        roomId: 1,
        user: { id: 1, nickname: 'test' },
        message: formRef.current['chat'].value,
      };
      send(chatting);
      formRef.current['chat'].value = '';
    }
    // stompClient.disconnect(); 웹소켓 연결 해제
  };

  // useEffect(() => {
  //   connect();
  // }, []);

  return (
    <Room state={state}>
      <Chat size="12" color="black">
        끝말잇기빌런 : 배고파
      </Chat>
      <Chat size="12" color="black">
        끝말잇기빌런2 : 배고파여
      </Chat>
      <ChattingBox ref={formRef} onSubmit={submitChat}>
        <Chatting type="text" name="chat" placeholder="채팅을 입력하세요" />
        <ChattingBtn type="submit">Enter</ChattingBtn>
      </ChattingBox>
    </Room>
  );
};

export default ChatRoom;

const ChattingBtn = styled.button`
  width: 10%;
  height: 100%;
  border-radius: 0 15px 15px 0;
  border-top-style: none;
  border-right-style: none;
  border-bottom-style: none;
  border-left-color: white;
  background-color: rgba(127, 127, 127, 1);
  color: white;
  &:hover {
    color: black;
  }
`;
const ChattingBox = styled.form`
  width: 97%;
  height: 28px;
  border-radius: 15px;
  background-color: rgba(127, 127, 127, 1);
  margin: 8px auto;
`;
const Chat = styled(Typography)`
  width: 97%;
  padding: 8px 6px;
  border-bottom: 0.8px solid black;
  margin: 0 auto;
`;

const Chatting = styled.input`
  color: white;
  padding: 0 12px;
  width: 90%;
  height: 100%;
  border-radius: 15px;
  background-color: rgba(127, 127, 127, 1);
  border: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: white;
    border-top-style: none;
    font-weight: 100;
    font-size: 8px;
  }
`;
const Scrollbar = css`
  ::-webkit-scrollbar {
    width: 16px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(0, 0, 0, 1); /* 스크롤바의 색상 */
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(198, 198, 198, 1); /*스크롤바 뒷 배경 색상*/
    border-radius: 25px;
  }
`;

const ChatRoomCss = css`
  width: 836px;
  height: 168px;
  z-index: 99;
`;
const lobbyCss = css`
  width: 900px;
  height: 184px;
  margin: 0 auto;
`;
const Room = styled.div<IChatRoom>`
  background-color: ${customColor.white};
  border-radius: 15px;
  overflow-y: scroll;

  ${Scrollbar}
  ${({ state }) => state === 'chatRoom' && ChatRoomCss}
  ${({ state }) => state === 'lobby' && lobbyCss}
`;
