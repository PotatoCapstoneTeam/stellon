import { useRef } from 'react';
import styled from 'styled-components';
import { customColor } from '../../../constants/customColor';
import { Typography } from '../../../components/Typography';
import { SearchImg } from '../components/GameStart';
import { useMutation } from 'react-query';
import { axiosPrivate } from '../../../util/axios';
import { useNavigate } from 'react-router-dom';

interface ICreateRoomModal {
  handleCloseModal: () => void;
  id: number;
}
interface IInfo {
  roomId: number;
  password: string;
}
const PassWordModal = ({ handleCloseModal, id }: ICreateRoomModal) => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const confirm = useMutation(
    (info: IInfo) => axiosPrivate.post('/room/validate/password', info),
    {
      onSuccess: (res) => {
        if (res?.status === 200) {
          navigate(`/game_room/${id}`);
        }
      },
      onError: (err) => console.log(err),
    }
  );
  const confirmPassword = (e: React.FormEvent) => {
    e.preventDefault();
    confirm.mutate({
      roomId: id,
      password: formRef.current?.['password'].value,
    });
  };

  return (
    <ModalBackGround>
      <ModalBox>
        <ModalHeader>
          <ModalTheme>
            <SearchImg src="../assets/list.png" alt="none" />
            <Typography color="white" size="16">
              비번 입력
            </Typography>
          </ModalTheme>
          <CloseModal onClick={() => handleCloseModal()}>
            <CloseImg src="../assets/close.png" alt="none" />
            <Typography color="white" size="16">
              닫기
            </Typography>
          </CloseModal>
        </ModalHeader>
        <ModalForm onSubmit={confirmPassword} ref={formRef}>
          <Theme>
            <Typography color="blue" size="16" fontWeight="800">
              비밀번호
            </Typography>
            <InputTheme
              type="password"
              name="password"
              placeholder="password"
            />
          </Theme>
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

export default PassWordModal;

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
  z-index: 99;
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
  &:active {
    transform: scale(0.95);
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
  z-index: 99;
  width: 600px;
  height: 200px;
`;
