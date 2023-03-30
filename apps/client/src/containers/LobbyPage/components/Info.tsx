import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';

export interface IInfo {
  nickname: string;
  kill: number;
  death: number;
  win: number;
  lose: number;
}

const Info = ({ nickname, kill, death, win, lose }: IInfo) => {
  const percentage = Math.floor((win * 100) / (lose + win)) || 0;

  return (
    <InfoBox>
      <InfoHeader>
        <InfoAirplane src="../assets/InfoAirplane.png" alt="none" />
        <Typography color="black" size="16">
          내 정보
        </Typography>
      </InfoHeader>
      <AirplaneBox>
        <UserAirplane src="../assets/userAirplane.png" alt="none" />
      </AirplaneBox>
      <NickName>
        <Typography color="black" size="16" fontWeight="900">
          {nickname || '이름없음'}
        </Typography>
      </NickName>
      <Record>
        <Typography color="black" size="12">
          {lose + win}전 {win}승{lose}패
        </Typography>
      </Record>
      <PercentageBox>
        <WinBox width={percentage as number}>
          <Typography color="white" size="16">
            {percentage}%
          </Typography>
        </WinBox>
      </PercentageBox>
    </InfoBox>
  );
};

export default Info;

const InfoBox = styled.div`
  z-index: 1;
  border-radius: 10px 0 0 0;
  width: 20%;
  height: 60%;
  flex-direction: column;
  display: flex;
`;

const WinBox = styled.div<{ width: number }>`
  text-align: center;
  background-color: rgba(0, 109, 163, 1);
  width: ${({ width }) => `${width}%`};
  margin-left: ${({ width }) => (width === 0 ? `4px` : `0px`)};
  border-radius: 6px;
`;
const PercentageBox = styled.div`
  border-radius: 6px;
  background-color: rgba(127, 127, 127, 1);
  margin: 12px auto 0;
  width: 200px;
`;

const Record = styled.div`
  margin: 0 auto;
`;

const NickName = styled.div`
  width: auto;
  display: inline-block;
  margin: 10px auto;
  padding: 5px 15px;
  border-radius: 15px;
  background-color: ${customColor.white};
`;
const UserAirplane = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
`;

const AirplaneBox = styled.div`
  height: 150px;
  background-color: black;
  position: relative;
  border-radius: 15px;
  margin: 0 30px 0 30px;
`;
const InfoAirplane = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 4px;
`;
const InfoHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 12px 0 12px 0;
`;
