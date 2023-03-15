import { Dispatch, SetStateAction } from 'react';
//   import CanvasClock from '../../../components/';
import styled, { css } from 'styled-components';
import { SearchImg } from '../components/GameStart';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';

interface IHelperModal {
  setHelperModalOpen: Dispatch<SetStateAction<boolean>>;
}

const HelperModal = ({ setHelperModalOpen }: IHelperModal) => {
  return (
    <ModalBackGround>
      <ModalWrapper>
        <ModalHeader>
          <ModalTheme>
            <SearchImg src="../assets/help.png" alt="none" />
            <Typography color="white" size="16">
              도움말
            </Typography>
          </ModalTheme>
          <CloseBtn
            onClick={() => {
              setHelperModalOpen(false);
            }}
          >
            <CloseImg src="../assets/close.png" alt="none" />
            <Typography color="white" size="16">
              닫기
            </Typography>
          </CloseBtn>
        </ModalHeader>
        <ModalBox>
          <PlaneBox>
            <Plane src="../../assets/helperModal/HelperRed.png" alt="none" />
            <Plane src="../../assets/helperModal/HelperBlue.png" alt="none" />
            <Typography color="black" size="16" fontWeight="bold">
              “STELLON”은 기본적으로 팀전으로 이루어져있습니다.
            </Typography>
          </PlaneBox>
          <KeyBoard>
            <KeyBox>
              <KeyPad color="white"></KeyPad>
              <KeyPad color="#006DA3">
                <span>W ㅈ</span>
              </KeyPad>
              <KeyPad color="white"></KeyPad>
            </KeyBox>
            <KeyBox>
              <KeyPad color="#006DA3">
                <span>A ㅁ</span>
              </KeyPad>
              <KeyPad color="#006DA3">
                <span>S ㄴ</span>
              </KeyPad>
              <KeyPad color="#006DA3">
                <span>D ㅇ</span>
              </KeyPad>
              <SpaceBar color="#006DA3">
                <span>Space Bar</span>
              </SpaceBar>
            </KeyBox>
            <KeyBoardExplain color="black" size="16" fontWeight="bold">
              W, A, S, D 키로 방향을 조작하고 Space Bar로 공격합니다.
            </KeyBoardExplain>
          </KeyBoard>
          <ClockBox>
            <ClockImg src="../../assets/helperModal/Clock.png" alt="none" />
            <Typography color="black" size="16" fontWeight="bold">
              제한시간 이내에 상대보다 더 많은 적을 죽이면 승리하는 게임입니다.
            </Typography>
          </ClockBox>
          <Typography color="blue" size="36" fontWeight="bold">
            승리를 기원합니다.
          </Typography>
        </ModalBox>
      </ModalWrapper>
    </ModalBackGround>
  );
};

export default HelperModal;

const KeyBoardExplain = styled(Typography)`
  margin-top: 20px;
`;

const ClockImg = styled.img`
  width: 90px;
  height: 90px;
  margin: 0 auto 10px;
`;
const CloseImg = styled.img`
  margin-right: 8px;
  width: 12px;
  height: 12px;
`;
const CloseBtn = styled.div`
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
const ModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  height: 36px;
  align-items: end;
  padding: 0 8px;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  width: 580px;
  height: 636px;
`;

const ModalTheme = styled.div`
  border-radius: 20px 20px 0 0;
  background-color: rgba(0, 109, 163, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 124px;
  height: 32px;
`;

const ModalBox = styled.div`
  padding: 24px 18px;
  text-align: center;
  justify-content: space-between;
  width: 580px;
  height: 636px;
  background-color: ${customColor.white};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;

const Plane = styled.img`
  width: 60px;
  height: 81x;
  margin: 0px 30px 20px;
`;
const PlaneBox = styled.div`
  text-align: center;
  height: 100px;
`;
const KeyBoard = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;
const KeyBox = styled.div`
  display: flex;
  height: 56px;
  margin: 5px;
`;
const KeyPad = styled.div`
  width: 56px;
  height: 56px;
  background: ${(props) => props.color};
  border-radius: 10px;
  align-items: center;
  color: white;
  margin: 5px;
  span {
    margin-left: 4px;
    margin-top: 4px;
  }
`;

const SpaceBar = styled.div`
  width: 280px;
  height: 56px;
  background: ${(props) => props.color};
  border-radius: 10px;
  align-items: center;
  color: white;
  margin: 5px;
  span {
    font-size: 20px;
    margin-left: 4px;
    margin-top: 4px;
  }
  margin-left: 40px;
  position: relative;
  top: -30px;
`;

const ClockBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
