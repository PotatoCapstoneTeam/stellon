import axios from 'axios';

export const myInfos = async () => {
  return await axios.get('/user');
};
