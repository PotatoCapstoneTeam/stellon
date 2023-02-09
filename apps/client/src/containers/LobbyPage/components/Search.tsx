import { useState } from 'react';
import styled from 'styled-components';
import { Typography } from '../../../components/Typography';

interface ISearch {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<boolean>>;
  sort: string;
}

const Search = ({ setSort, sort, setOrder }: ISearch) => {
  const [sortType, setSortType] = useState('시간순');
  const changeSortType = () => {
    if (sort === 'id') {
      setSort('name');
      setSortType('가나다순');
    }
    if (sort === 'name') {
      setSort('size');
      setSortType('인원수순');
    }
    if (sort === 'size') {
      setSort('password');
      setSortType('비번방순');
    }
    if (sort === 'password') {
      setSort('id');
      setSortType('시간순');
    }
  };

  return (
    <SearchGameList>
      <OrderBtn
        type="checkbox"
        id="order"
        onChange={(e) => {
          e.target.checked ? setOrder(true) : setOrder(false);
        }}
      />
      <label htmlFor="order">올림차순</label>

      <RangeBtn onClick={changeSortType}>
        <RangeImg src="../assets/range.png" alt="none" />
        <Typography color="black" size="16">
          {sortType}
        </Typography>
      </RangeBtn>
      {/* <RefreshBtn onClick={() => window.location.reload()}>
        <RefreshImg src="../assets/refresh.png" alt="none" />
        <Typography color="black" size="16">
          새로고침
        </Typography>
      </RefreshBtn> */}
    </SearchGameList>
  );
};

export default Search;

const OrderBtn = styled.input``;

const SearchGameList = styled.div`
  align-items: center;
  display: flex;
`;
const RangeBtn = styled.div`
  margin-left: 12px;
  align-items: center;
  display: flex;
  &:hover {
    cursor: pointer;
  }
  width: 86px;
`;

const RefreshBtn = styled.div`
  align-items: center;
  display: flex;
  margin-left: 16px;
  &:hover {
    cursor: pointer;
  }
`;
const RefreshImg = styled.img`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;

const RangeImg = styled.img`
  margin-right: 4px;
  width: 16px;
  height: 16px;
`;
