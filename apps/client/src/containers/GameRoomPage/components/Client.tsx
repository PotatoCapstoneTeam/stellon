import styled from 'styled-components';
import UserCard from './UserCard';

export const Client = () => {
  return (
    <UserBox>
      {[false, true, false, false, true, true, false, false].map((e, i) => (
        <UserCard state={e} key={i} />
      ))}
    </UserBox>
  );
};

export default Client;

const UserBox = styled.div`
  width: 836px;
  height: 380px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
`;
