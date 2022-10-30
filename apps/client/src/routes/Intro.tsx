import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';
import axios from 'axios';

const Intro = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [loginHover, setLoginHover] = useState(false);
  const [signUpHover, setSignUpHover] = useState(false);
  const navigate = useNavigate();

  function login() {
    if (!id) {
      return alert('아이디를 입력하세요.');
    } else if (!password) {
      return alert('패스워드를 입력하세요.');
    }
    const body = {
      id,
      password,
    };
    console.log(body);
    axios
      .post('url', body)
      .then((res) => {
        console.log(
          res.data,
          res.status,
          res.statusText,
          res.headers,
          res.config
        );
        localStorage.setItem('Token', '여기에 토큰 저장');
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Space />
      <Container>
        <IntroImg src="../assets/logo.svg" alt="none" />
        <LoginForm>
          <LoginBox>
            <IdBox>
              <NewTypography color="white" size="24">
                ID
              </NewTypography>
              <IdInput
                type="text"
                onChange={(e) => {
                  setId(e.target.value);
                  console.log(id);
                }}
                value={id}
              />
            </IdBox>
            <PwBox>
              <NewTypography color="white" size="24">
                PW
              </NewTypography>
              <PwInput
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                  console.log(password);
                }}
                value={password}
              />
            </PwBox>
          </LoginBox>
          <BtnBox>
            <SignUpBtn
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
            <LoginBtn
              onMouseOver={() => {
                setLoginHover(true);
              }}
              onMouseOut={() => {
                setLoginHover(false);
              }}
              onClick={() => login()}
            >
              <BtnTypography size="24" color="white">
                LOGIN
              </BtnTypography>
              <LoginImg
                src="../assets/blueFighter.png"
                alt="none"
                hover={loginHover}
              />
            </LoginBtn>
          </BtnBox>
        </LoginForm>
      </Container>
    </div>
  );
};

export default Intro;

const hoverBtn = keyframes`
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

const Animate = css`
  animation: ${hoverBtn} 0.5s linear 1s infinite;
`;

const Img = styled.img<{ hover: boolean }>`
  position: relative;
  width: 32px;
  height: 32px;
  margin-left: 12px;
`;

const SignUpImg = styled(Img)<{ hover: boolean }>`
  ${(props) => props.hover && Animate};
`;

const LoginImg = styled(Img)<{ hover: boolean }>`
  ${(props) => props.hover && Animate};
`;

const LoginBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  height: 36px;
  &:hover {
    cursor: pointer;
  }
`;

const BtnBox = styled.div``;

const SignUpBtn = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  height: 36px;
  margin-right: 12px;
`;

const LoginBox = styled.div`
  width: 280px;
  align-items: center;
`;

const Input = styled.input`
  width: 240px;
  height: 32px;
  margin-left: 10px;
  border-radius: 10px;
`;
const IdInput = styled(Input)``;

const PwInput = styled(Input)``;

const IdBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 36px;
  align-items: center;
`;

const PwBox = styled.div`
  display: flex;
  height: 36px;
  align-items: center;
`;

const Container = styled.div`
  width: 450px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LoginForm = styled.div`
  display: flex;
  justify-content: space-between;
`;

const IntroImg = styled.img`
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
`;

const NewTypography = styled(Typography)`
  width: 48px;
  text-align: center;
  line-height: 32px;
`;

const BtnTypography = styled(Typography)`
  line-height: 32px;
`;
