import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';

const ReReady = () => {
  return (
    <div>
      <ResetReady color="black" size="24" fontWeight="900">
        준비 해제
      </ResetReady>
    </div>
  );
};

export default ReReady;

const ResetReady = styled(Typography)`
  background-color: ${customColor.white};
  padding: 5px 15px;
  padding: 20px 88px;
  border-radius: 20px;
  &:hover {
    cursor: pointer;
  }
`;
