import styled, { css } from 'styled-components';
import { Typography } from '../../../components/Typography';
import { customColor } from '../../../constants/customColor';
import Users from './Users';
import { IUser } from '../LobbyPage';

interface UserList {
  userList: IUser[];
}

const UserList = ({ userList }: UserList) => {
  return (
    <ListBox onClick={() => console.log(userList)}>
      <Header>
        <Img src="../assets/InfoAirplane.png" />
        <Typography color="black" size="12">
          접속자 목록
        </Typography>
      </Header>
      <List>
        {userList.map((e, index) => (
          <Users key={index} nickname={e.nickname} />
        ))}
      </List>
    </ListBox>
  );
};

export default UserList;
const Scrollbar = css`
  ::-webkit-scrollbar {
    width: 16px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: rgba(0, 0, 0, 1); /* 스크롤바의 색상 */
    border-radius: 25px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(198, 198, 198, 1); /*스크롤바 뒷 배경 색상*/
    border-radius: 25px;
  }
`;
const ListBox = styled.div`
  width: 20%;
  border-radius: 0 0 10px 0;
  height: 40%;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;
const Img = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 4px;
  margin: 8px 0;
`;
const List = styled.div`
  background-color: ${customColor.white};
  border-radius: 15px;
  width: 236px;
  height: 184px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  ${Scrollbar}
`;
