import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Intro = () => {
  const [loginHover, setLoginHover] = useState(false);
  const [signUpHover, setSignUpHover] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user']); // 쿠키 훅

  const [values, setValues] = useState({
    id: '',
    password: '', // 4자리 이상 조건 설정해야함
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
    console.log(values);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('https://stellon.shop/auth/login', values)
      .then((res) => {
        console.log(
          res.data,
          res.status,
          res.statusText,
          res.headers,
          res.config
        );
        // setCookie('user', res.data.token); // 쿠키에 토큰 저장
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Space />
      <Container>
        <IntroImg src="../assets/logo.svg" alt="none" />
        <LoginForm onSubmit={handleSubmit}>
          <LoginBox>
            <IdBox>
              <NewTypography color="white" size="24">
                ID
              </NewTypography>
              <IdInput
                type="text"
                name="id"
                onChange={handleChange}
                value={values.id}
              />
            </IdBox>
            <PwBox>
              <NewTypography color="white" size="24">
                PW
              </NewTypography>
              <PwInput
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
            </PwBox>
          </LoginBox>
          <BtnBox>
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

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
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

const LoginForm = styled.form`
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
