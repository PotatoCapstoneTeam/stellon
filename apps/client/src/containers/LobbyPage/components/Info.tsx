import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';

const Info = () => {
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
          임송재
        </Typography>
      </NickName>
      <Record>
        <Typography color="black" size="12">
          300전 150승 150패
        </Typography>
      </Record>
      <PercentageBox>
        <WinBox width={80}>
          <Typography color="white" size="16">
            80%
          </Typography>
        </WinBox>
      </PercentageBox>
    </InfoBox>
  );
};

export default Info;

const InfoBox = styled.div`
  z-index: 99;
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
  border-radius: 25px 0 0 25px;
`;
const PercentageBox = styled.div`
  border-radius: 25px;
  background-color: rgba(127, 127, 127, 1);
  margin: 0 auto;
  width: 200px;
  margin-top: 12px;
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
