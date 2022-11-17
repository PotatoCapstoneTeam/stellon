import styled, { css, keyframes } from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';
import { customColor } from '../constants/customColor';
import { useCookies } from 'react-cookie';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { errorMonitor } from 'events';

const SignUp = () => {
  const [loginHover, setLoginHover] = useState(false);

  const [btnActive, setBtnACtive] = useState(true);

  const [email, setEmail] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [isEmail, setIsEmail] = useState(false);

  const onChangeEmail = (e: any) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;

    if (!emailRegExp.test(currentEmail)) {
      setEmailMessage('이메일의 형식이 올바르지 않습니다');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  };

  const [name, setName] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [isName, setIsName] = useState(false);
  const onChangeName = (e: any) => {
    const currentName = e.target.value;
    setName(currentName);

    if (currentName.length < 2 || currentName.length > 8) {
      setNameMessage('닉네임은 2글자 이상 8글자 이하로 입력해주세요');
      setIsName(false);
    } else {
      setNameMessage('');
      setIsName(true);
    }
  };

  const [password, setPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [isPassword, setIsPassword] = useState(false);
  const onChangePassword = (e: any) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp =
      /^(?=.*[a-zA-Z])(?=.*[.!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    if (!passwordRegExp.test(currentPassword)) {
      setPasswordMessage(
        '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요'
      );
      setIsPassword(false);
    } else {
      setPasswordMessage('');
      setIsPassword(true);
    }
  };

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const onChangePasswordConfirm = (e: any) => {
    const currentPasswordConfirm = e.target.value;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('동일한 비밀번호를 입력해야 합니다');
      setIsPasswordConfirm(false);
    } else {
      setPasswordConfirmMessage('');
      setIsPasswordConfirm(true);
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
        alert(JSON.parse(JSON.stringify(err.response.data.error)));
      });
  };

  return (
    <>
      <Space />
      <Wrapper>
        <SignUpImg src="../assets/signup.png" alt="none" />
        <SignUpForm ref={formRef} onSubmit={handleSubmit}>
          <SignUpBox>
            <EmailBox>
              <NewTypography color="white" size="24">
                Email
              </NewTypography>
              <EmailInput
                value={email}
                onChange={onChangeEmail}
                type="text"
                name="email"
                placeholder="이메일을 입력해주세요"
                required
              />
            </EmailBox>
            <Message style={isEmail ? { color: "blue" } : { color: "red" }} >{emailMessage}</Message>

            <NameBox>
              <NewTypography color="white" size="24">
                Name
              </NewTypography>
              <NameInput
                value={name}
                onChange={onChangeName}
                type="text"
                name="nickname"
                placeholder="닉네임을 입력해주세요"
                required
              />
            </NameBox>
            <Message  style={isName ? { color: "blue" } : { color: "red" }}>{nameMessage}</Message>

            <PwBox>
              <NewTypography color="white" size="24">
                PassWord
              </NewTypography>
              <PwInput
                value={password}
                onChange={onChangePassword}
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                required
              />
            </PwBox>
            <Message  style={isPassword ? { color: "blue" } : { color: "red" }}>{passwordMessage}</Message>

            <PwChkBox>
              <NewTypography color="white" size="24">
                PW Check
              </NewTypography>
              <PwChkInput
                value={passwordConfirm}
                onChange={onChangePasswordConfirm}
                type="password"
                name="passwordCheck"
                placeholder="비밀번호를 확인해주세요"
                required
              />
            </PwChkBox>
            <Message  style={isPasswordConfirm ? { color: "blue" } : { color: "red" }}>{passwordConfirmMessage}</Message>
          </SignUpBox>
          <BtnBox>
            <LoginBtn
              type="submit"
              onMouseOver={() => {
                setLoginHover(true);
              }}
              onMouseOut={() => {
                setLoginHover(false);
              }}
            >
              <BtnTypography size="60" color="white">
                Let's GO!
              </BtnTypography>

              <LoginImg
                src="../assets/redFighter.png"
                alt="none"
                hover={loginHover}
              />
            </LoginBtn>
          </BtnBox>
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
  position: absolute;
  width: 400px;
  align-items: center;
  left: -100px;
`;

const EmailBox = styled.div`
  display: flex;
  margin-bottom: 10px;
  height: 36px;
  align-items: center;
`;

const NameBox = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 10px;
  align-items: center;
`;
const PwBox = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 10px;
  align-items: center;
`;
const PwChkBox = styled.div`
  display: flex;
  height: 36px;
  margin-bottom: 10px;
  align-items: center;
`;

const Input = styled.input`
  width: 200px;
  height: 32px;
  margin-left: 0px;
  border-radius: 10px;
`;

const EmailInput = styled(Input)``;

const NameInput = styled(Input)``;

const PwChkInput = styled(Input)``;

const PwInput = styled(Input)``;

const SignUpImg = styled.img`
  width: 100%;
  height: 67px;
  margin-bottom: 50px;
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

const Message = styled.p`
  position: relative;
  left: 100px;
  color: white;
  
  color: red;
  font-weight: red;
`;
const BtnBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: -100px;
  top: 200px;
`;
