import { useModal } from '../../../hooks/useModal';
import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import WatchUserInfoModal from '../../LobbyPage/modal/WatchUserInfoModal';

interface IUserCard {
  ready: boolean;
  nickname: string;
  team: string;
  manager: boolean;
  // 레디상태, 닉네임, 비행기 색깔와 기종, 유저의 정보, 방장인지 아닌지 필요
}

export const UserCard = ({ ready, nickname, team, manager }: IUserCard) => {
  const { isOpen, handleCloseModal, handleModal } = useModal();

  return (
    <Container>
      <MySpaceShip>
        {team === 'RED_TEAM' ? (
          <SpaceShipImg
            src="../assets/UserCard/redSpaceShip_1.png"
            alt="none"
          />
        ) : (
          <SpaceShipImg
            src="../assets/UserCard/blueSpaceShip_1.png"
            alt="none"
          />
        )}

        {ready && (
          <Ready color="yellow" size="40" fontWeight="900">
            READY
          </Ready>
        )}
      </MySpaceShip>
      <Footer>
        {manager && <ManagerImg src="../assets/UserCard/Reader.png" />}
        <NickName color="white" size="16">
          {nickname}
        </NickName>
        <InfoImg
          src="../assets/UserCard/info.png"
          onClick={() => handleModal()}
        />
        {isOpen && (
          <WatchUserInfoModal
            nickname={nickname}
            handleCloseModal={handleCloseModal}
          />
        )}
      </Footer>
    </Container>
  );
};

export default UserCard;

const ManagerImg = styled.img`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 6px;
`;

const InfoImg = styled.img`
  width: 20px;
  height: 20px;
  &:hover {
    filter: opacity(0.5) drop-shadow(0 0 0 red);
    cursor: pointer;
  }
  position: absolute;
  right: 6px;
`;

const Ready = styled(Typography)`
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SpaceShipImg = styled.img`
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const MySpaceShip = styled.div`
  background-color: black;
  height: 140px;
  border-radius: 15px 15px 0 0;
  position: relative;
  width: 100%;
`;
const Footer = styled.footer`
  position: relative;
  background-color: rgba(29, 74, 157, 1);
  border-radius: 0 0 15px 15px;
  height: 40px;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const NickName = styled(Typography)`
  text-align: center;
  line-height: 40px;
`;
const Container = styled.div`
  position: relative;
  width: 200px;
  height: 184px;
  border: 2px solid transparent;
  border-radius: 15px;
`;
