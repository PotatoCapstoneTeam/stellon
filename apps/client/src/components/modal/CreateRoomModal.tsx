import axios from 'axios';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import styled from 'styled-components';
import { customColor } from '../../constants/customColor';
import { SearchImg } from '../../routes/Lobby';
import { Typography } from '../Typography';
import { useCookies } from 'react-cookie';

interface ICreateRoomModal {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateRoomModal = ({ setModalOpen }: ICreateRoomModal) => {
  const [cookies] = useCookies(['user_access_token', 'user_refresh_token']); // 쿠키 훅
  const formRef = useRef<HTMLFormElement>(null);
  const [checkBox, setCheckBox] = useState(false);

  const onCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    const refreshToken = cookies['user_refresh_token'];
    const accessToken = cookies['user_access_token'];

    axios
      .post(
        'https://stellon.shop/room',
        {
          roomName: formRef.current?.['theme'].value,
          roomSize: formRef.current?.['number'].value, //int
          password: checkBox ? formRef.current?.['password'].value : '',
        },
        {
          headers: { Authorization: accessToken },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ModalBackGround>
      <ModalBox>
        <ModalHeader>
          <ModalTheme>
            <SearchImg src="../assets/list.png" alt="none" />
            <Typography color="white" size="16">
              방 만들기
            </Typography>
          </ModalTheme>
          <CloseModal
            onClick={() => {
              setModalOpen(false);
            }}
          >
            <CloseImg src="../assets/close.png" alt="none" />
            <Typography color="white" size="16">
              닫기
            </Typography>
          </CloseModal>
        </ModalHeader>
        <ModalForm onSubmit={onCreateRoom} ref={formRef}>
          <Theme>
            <Typography color="blue" size="16" fontWeight="800">
              방 제목
            </Typography>
            <InputTheme type="text" name="theme" placeholder="Theme" />
          </Theme>
          <PeopleBox>
            <Typography color="blue" size="16" fontWeight="800">
              인원
            </Typography>
            <SetPeople>
              <People name="number">
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={6}>6</option>
                <option value={8}>8</option>
              </People>
            </SetPeople>
          </PeopleBox>
          <PassWord>
            <CheckBox
              type="checkbox"
              name="checkbox"
              onChange={(e) => {
                e.target.checked ? setCheckBox(true) : setCheckBox(false);
              }}
            />
            <Typography color="blue" size="16" fontWeight="800">
              비밀번호
            </Typography>
            <InputPassword
              type="password"
              name="password"
              placeholder="Password"
              disabled={!checkBox}
              check={checkBox}
            />
          </PassWord>
          <CreateRoom
            type="image"
            src="../assets/createRoomBtn.png"
            alt="none"
          />
        </ModalForm>
      </ModalBox>
    </ModalBackGround>
  );
};

export default CreateRoomModal;

const CreateRoom = styled.input`
  border: none;
  position: absolute;
  top: 50%;
  right: -180px;
  transform: translate(-50%, -28%);
  &:hover {
    cursor: pointer;
  }
`;
const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
`;
const People = styled.select`
  height: 40px;
  width: 60px;
  font-size: 16px;
  border-radius: 15px;
  border: 2px solid ${customColor.blue};
  text-align: center;
`;
const SetPeople = styled.div`
  margin-left: 12px;
`;
const CheckBox = styled.input`
  margin-right: 4px;
`;
const InputPassword = styled.input<{ check: boolean }>`
  width: 90px;
  border-radius: 15px;
  height: 40px;
  border: 2px solid ${customColor.blue};
  padding-left: 8px;
  margin-left: 12px;
  background-color: ${({ check }) => !check && customColor.gray};
`;
const InputTheme = styled.input`
  padding-left: 8px;
  font-size: 16px;
  border: 2px solid ${customColor.blue};
  width: 425px;
  border-radius: 15px;
  height: 40px;
  margin-left: 12px;
`;
const Theme = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  margin-right: 12px;
`;
const PassWord = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
`;
const PeopleBox = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
`;
const CloseModal = styled.div`
  border-radius: 20px 20px 0 0;
  background-color: rgba(0, 109, 163, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 32px;
  &:hover {
    cursor: pointer;
  }
`;
const ModalTheme = styled.div`
  border-radius: 20px 20px 0 0;
  background-color: rgba(0, 109, 163, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 32px;
`;

const CloseImg = styled.img`
  margin-right: 8px;
  width: 12px;
  height: 12px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  align-items: end;
  padding: 0 8px;
`;
const ModalForm = styled.form`
  height: 164px;
  background-color: ${customColor.white};
  border-radius: 15px;
  display: flex;
  padding: 26px 30px;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;
const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 600px;
  height: 200px;
`;
