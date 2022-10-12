import styled from 'styled-components';
import Space from '../canvas/Space';
import { Typography } from '../components/Typography';

const Intro = () => {
  return (
    <div>
      <Space />
      <NewTypography color="white" size="16">
        로그인창을 여기다 만들꺼에요
      </NewTypography>
    </div>
  );
};

export default Intro;

const NewTypography = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
