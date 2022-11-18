import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Animate, BtnTypography, Img } from './LoginButton';

const SignUpButton = () => {
  const navigate = useNavigate();
  const [signUpHover, setSignUpHover] = useState(false);
  return (
    <SignUpBtn
      type="button"
      onMouseOver={() => {
        setSignUpHover(true);
      }}
      onMouseOut={() => {
        setSignUpHover(false);
      }}
      onClick={() => navigate('/signUp')}
    >
      <BtnTypography size="24" color="white">
        SIGN UP
      </BtnTypography>
      <SignUpImg
        src="../assets/redFighter.png"
        alt="none"
        hover={signUpHover}
      />
    </SignUpBtn>
  );
};

export default SignUpButton;
const SignUpImg = styled(Img)<{ hover: boolean }>`
  ${(props) => props.hover && Animate};
`;
const SignUpBtn = styled.button`
  border: 0;
  background-color: transparent;
  outline: 0;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 36px;
  margin-right: 12px;
`;
