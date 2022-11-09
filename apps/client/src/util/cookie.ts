import { Cookies } from 'react-cookie';

const cookies = new Cookies();

interface ISetCookies {
  name: string;
  value: string;
  option?: any;
}
export const setCookies = ({ name, value, option }: ISetCookies) => {
  return cookies.set(name, value, { ...option });
};

export const getCookies = (name: string) => {
  return cookies.get(name);
};
