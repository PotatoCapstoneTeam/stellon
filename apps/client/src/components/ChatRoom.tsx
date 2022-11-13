import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { customColor } from '../constants/customColor';
import { Typography } from './Typography';

interface IChatRoom {
  state: string;
}

const ChatRoom = ({ state }: IChatRoom) => {
  const [chat, setChat] = useState('');

  return (
    <Room state={state}>
      <Chat size="12" color="black">
        끝말잇기빌런 : 배고파
      </Chat>
      <Chat size="12" color="black">
        끝말잇기빌런 : 배고파
      </Chat>
      <Chat size="12" color="black">
        안호빈 : 나도
      </Chat>
      <Chat size="12" color="black">
        김효성 : 잘래
      </Chat>
      <Chat size="12" color="black">
        박현호 : 배고파
      </Chat>
      <Chat size="12" color="black">
        박청조 : 재밌다
      </Chat>
      <Chat size="12" color="black">
        손흥민 : 배고파
      </Chat>
      <Chat size="12" color="black">
        끝말잇기빌런 : 밥줘
      </Chat>
      <Chat size="12" color="black">
        임송재 : 졸려
      </Chat>
      <ChattingBox>
        <Chatting
          type="text"
          placeholder="채팅을 입력하세요"
          onChange={(e) => {
            setChat(e.target.value);
            console.log(chat);
          }}
          value={chat}
        />
        <ChattingBtn>Enter</ChattingBtn>
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
const ChattingBox = styled.div`
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