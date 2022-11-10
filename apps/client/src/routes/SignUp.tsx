import styled, { css, keyframes } from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';
import { customColor } from '../constants/customColor';
import { useCookies } from 'react-cookie';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [loginHover, setLoginHover] = useState(false);

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const onChangeEmail = (e: any) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage('이메일의 형식이 올바르지 않습니다!');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일 입니다 !');
      setIsEmail(true);
    }
  };
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    axios
      .post('https://stellon.shop/auth/join', {
        email: formRef.current?.['email'].value,
        nickname: formRef.current?.['nickname'].value,
        password: formRef.current?.['password'].value,
      })
      .then((res) => {
        console.log(res.data);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        alert()
      });
  };


  return (
    <>
      <Space />
      <Wrapper>
        <SignUpImg
          src="../assets/signup.png"
          alt="none"
        />
        <SignUpForm ref={formRef} onSubmit={handleSubmit}>
          <SignUpBox>
            <EmailBox>
              <NewTypography color="white" size="24">
                Email
              </NewTypography>
              <EmailInput
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요"
              />
            </EmailBox>

            <NameBox>
              <NewTypography color="white" size="24">
                NAME
              </NewTypography>
              <NameInput
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
              />
            </NameBox>

            <PwBox>
              <NewTypography color="white" size="24">
                PW
              </NewTypography>
              <PwInput
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </PwBox>

            <PwChkBox>
              <NewTypography color="white" size="24">
                PW CHECK
              </NewTypography>
              <PwChkInput
                type="password"
                name="passwordCheck"
                placeholder="비밀번호를 확인해주세요"
              />
            </PwChkBox>
          </SignUpBox>

          <LoginBtn
            type="submit"
            onMouseOver={() => {
              setLoginHover(true);
            }}
            onMouseOut={() => {
              setLoginHover(false);
            }}
          >
            <BtnTypography size="44" color="white">
              Let's GO!
            </BtnTypography>

            <LoginImg
              src="../assets/redFighter.png"
              alt="none"
              hover={loginHover}
            />
          </LoginBtn>
        </SignUpForm>
      </Wrapper>
    </>
  );
};

export default SignUp;

const Wrapper = styled.div`
  position: absolute;
  width: 500x;
  height: 400px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
`;
const NewTypography = styled(Typography)`
  position: relative;
  width: 200px;
  text-align: center;
  line-height: 32px;
`;

const SignUpBox = styled.div`
  width: 500px;
  align-items: center;
`;

const EmailBox = styled.div`
  display: flex;
  margin-bottom: 20px;
  height: 36px;
  align-items: center;
`;

const NameBox = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 20px;
  align-items: center;
`;
const PwBox = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 20px;
  align-items: center;
`;
const PwChkBox = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 40px;
  align-items: center;
`;

const Input = styled.input`
  width: 240px;
  height: 32px;
  margin-left: 10px;
  border-radius: 10px;
`;

const EmailInput = styled(Input)``;

const NameInput = styled(Input)``;

const PwChkInput = styled(Input)``;

const PwInput = styled(Input)``;

const SignUpImg = styled.img`
  width: 100%;
  height: 100px;
  margin-bottom: 0px;
`;

const BtnTypography = styled(Typography)`
  line-height: 50px;
`;

const LoginBtn = styled.button`
  border: 0;
  background-color: transparent;
  outline: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 130px;
  height: 36px;
  &:hover {
    cursor: pointer;
  }
`;
const Img = styled.img<{ hover: boolean }>`
  position: relative;
  width: 32px;
  height: 32px;
  margin-left: 12px;
`;

const LoginImg = styled(Img)<{ hover: boolean }>`
  ${(props) => props.hover && Animate};
`;

const hoverBtn = keyframes`
  0%{
    left: 2px;
  }
  25%{
    left : 4px
  }
  50%{
    left: 8px;
  }
   75%{
    left : 16px
  }

  100%{
    left: 32px;
  }
`;

const Animate = css`
  animation: ${hoverBtn} 1s linear 0.1s infinite;
`;

const SignUpForm = styled.form``;
