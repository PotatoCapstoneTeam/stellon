import { Typography } from '../../../components/Typography';
import styled from 'styled-components';
import { customColor } from '../../../constants/customColor';
import { useQuery } from 'react-query';
import { axiosPrivate } from '../../../util/axios';
import { useEffect, useState } from 'react';

interface ICreateRoomModal {
  handleCloseModal: () => void;
  nickname: string;
}
interface IRecordDtos {
  death: number;
  gameMember: number;
  kill: number;
  nexusDamage: number;
  playerDamage: number;
  win: boolean;
}
interface IInfoData {
  death: number;
  kill: number;
  nickname: string;
  lose: number;
  win: number;
  recordDtos: IRecordDtos[];
}
const WatchUserInfoModal = ({
  handleCloseModal,
  nickname,
}: ICreateRoomModal) => {
  // 여기에서 유저정보 API 받고 적용하기 !

  const [infoData, setInfoData] = useState<IInfoData>();
  const win = infoData ? infoData.win : 0;
  const lose = infoData ? infoData.lose : 0;
  const percentage = Math.floor((win * 100) / (lose + win)) || 0;
  const recordList = infoData?.recordDtos;

  useEffect(() => {
    console.log(recordList);
  }, [recordList]);

  useQuery(
    'infoModalData',
    () => axiosPrivate.get(`/user/data?nickname=${nickname}`),
    {
      onSuccess: (res) => {
        console.log(res.data);
        console.log(res.data.recordDtos);
        setInfoData(res.data);
      },
      onError: (err) => console.log(err),
    }
  );

  return (
    <ModalBackground>
      <ModalBox>
        <ModalHeader>
          <ModalTheme>
            <Typography color="white" size="16">
              내 정보
            </Typography>
          </ModalTheme>
          <CloseModal onClick={() => handleCloseModal()}>
            <CloseImg src="../assets/close.png" alt="none" />
            <Typography color="white" size="16">
              닫기
            </Typography>
          </CloseModal>
        </ModalHeader>
        <ModalContent>
          <Theme color="black" size="20" fontWeight="500">
            내 정보
          </Theme>
          <ImgBox>
            <UserImg src="../../assets/userAirplane.png" alt="none"></UserImg>
          </ImgBox>
          <NickName>
            <Typography color="black" size="16" fontWeight="500">
              {infoData?.nickname}
            </Typography>
          </NickName>
          <Record>
            <Typography color="black" size="12" fontWeight="500">
              {win + lose}전 / {win}승 {lose}패
            </Typography>
          </Record>
          <PercentageBox>
            <WinBox width={percentage}>
              <Typography color="white" size="16">
                {percentage}%
              </Typography>
            </WinBox>
          </PercentageBox>
          <Typography color="black" size="24" fontWeight="500">
            최근 전적
          </Typography>
          <RecentRecordBox>
            {recordList?.map((e, i) => (
              <RecordBox key={i}>
                <VS win={e.win}>
                  {e.gameMember / 2} vs {e.gameMember / 2}
                </VS>
                {e.kill} 킬 {e.death} 데스 {e.nexusDamage} 넥서스{' '}
                {e.playerDamage} 딜량
              </RecordBox>
            ))}
          </RecentRecordBox>
        </ModalContent>
      </ModalBox>
    </ModalBackground>
  );
};

export default WatchUserInfoModal;
const VS = styled.span<{ win: boolean }>`
  font-size: 10px;
  margin-right: 4px;
  color: ${({ win }) => (win ? 'green' : 'red')};
  font-weight: 900;
`;
const RecordBox = styled.div`
  display: flex;
  align-items: center;
  padding-left: 12px;
  width: 50%;
  height: 25%;
  font-size: 12px;
`;
const ImgBox = styled.div`
  margin-bottom: 8px;
  background-color: ${customColor.black};
  padding: 24px;
  border-radius: 32px;
`;
const UserImg = styled.img`
  width: 168px;
  height: 168px;
`;
const NickName = styled.div``;
const Record = styled.div`
  margin: 4px 0;
`;
const WinBox = styled.div<{ width: number }>`
  text-align: center;
  background-color: rgba(0, 109, 163, 1);
  width: ${({ width }) => `${width}%`};
  border-radius: 6px;
  margin-left: ${({ width }) => (width === 0 ? `4px` : `0px`)};
`;
const PercentageBox = styled.div`
  border-radius: 6px;
  background-color: rgba(127, 127, 127, 1);
  width: 200px;
  margin: 12px 0;
`;
const RecentRecordBox = styled.div`
  margin: 8px 0;
  border: 6px solid rgba(0, 109, 163, 1);
  width: 500px;
  height: 100px;
  border-radius: 24px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 0;
    border-left: 2px dashed #006da3;
    transform: translateX(-50%);
  }
`;

const Theme = styled(Typography)`
  margin: 12px 0;
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
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px 20px 0 0;
  background-color: rgba(0, 109, 163, 1);
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
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 0 0 20px 20px;
  background-color: ${customColor.white};
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
`;
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
`;
