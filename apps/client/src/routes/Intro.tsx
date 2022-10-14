import styled from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';

const Intro = () => {
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
              <IdInput type="text" />
            </IdBox>
            <PwBox>
              <NewTypography color="white" size="24">
                PW
              </NewTypography>
              <PwInput type="text" />
            </PwBox>
          </LoginBox>
          <BtnBox>
            <SignUpBtn>
              <Typography size="24" color="white">
                SIGN UP
              </Typography>
              <Img src="../assets/redFighter.png" alt="none" />
            </SignUpBtn>
            <LoginBtn>
              <Typography size="24" color="white">
                LOGIN
              </Typography>
              <Img src="../assets/blueFighter.png" alt="none" />
            </LoginBtn>
          </BtnBox>
        </LoginForm>
      </Container>
    </div>
  );
};

export default Intro;

const Img = styled.img`
  width: 32px;
  height: 32px;
  margin-left: 12px;
`;
const LoginBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  height: 36px;
`;
const BtnBox = styled.div``;

const SignUpBtn = styled.div`
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

const IdInput = styled.input`
  width: 240px;
  height: 30px;
  margin-left: 10px;
  border-radius: 10px;
`;

const PwInput = styled.input`
  width: 240px;
  margin-left: 10px;
  height: 30px;
  border-radius: 10px;
`;

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
  line-height: 100%;
`;
