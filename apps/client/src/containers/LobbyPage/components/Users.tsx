import React from 'react';
import styled from 'styled-components';
import { Typography } from '../../../components/Typography';

const Users = () => {
  return (
    <User>
      <UserName color="black" size="12" fontWeight="900">
        임송재
      </UserName>
      <UserInfoBtn>정보</UserInfoBtn>
    </User>
  );
};

export default Users;

const User = styled.div`
  display: flex;
  margin: 0 12px 0 12px;
  align-items: center;
  padding: 4px 0;
  justify-content: space-between;
  border-bottom: 0.8px solid black;
`;

const UserInfoBtn = styled.button`
  width: 40px;
  height: 21px;
  font-size: 4px;
  border-radius: 5px;
  background-color: rgba(135, 135, 135, 1);
  border: none;
  color: white;
  font-weight: 200;
  margin-right: 8px;
  &:hover {
    color: black;
  }
`;

const UserName = styled(Typography)`
  margin-left: 4px;
`;
