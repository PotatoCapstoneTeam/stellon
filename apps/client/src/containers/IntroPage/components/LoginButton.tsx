import React, { useState } from 'react';
import { Typography } from '../../../components/Typography';
import styled, { css, keyframes } from 'styled-components';

const LoginButton = () => {
  const [loginHover, setLoginHover] = useState(false);
  return (
    <LoginBtn
      type="submit"
      onMouseOver={() => {
        setLoginHover(true);
      }}
      onMouseOut={() => {
        setLoginHover(false);
      }}
    >
      <BtnTypography size="24" color="white">
        LOGIN
      </BtnTypography>
      <LoginImg src="../assets/blueFighter.png" alt="none" hover={loginHover} />
    </LoginBtn>
  );
};

export default LoginButton;
export const BtnTypography = styled(Typography)`
  line-height: 32px;
`;

const LoginBtn = styled.button`
  border: 0;
  background-color: transparent;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  height: 36px;
  &:hover {
    cursor: pointer;
  }
`;
export const hoverBtn = keyframes`
  0%{
      left: 2px;
  }
  50%{
    left: 4px;
  }
  100%{
    left: 8px;
  }
  `;

export const Animate = css`
  animation: ${hoverBtn} 0.5s linear 1s infinite;
`;

export const Img = styled.img<{ hover: boolean }>`
  position: relative;
  width: 32px;
  height: 32px;
  margin-left: 12px;
`;

const LoginImg = styled(Img)<{ hover: boolean }>`
  ${(props) => props.hover && Animate};
`;
