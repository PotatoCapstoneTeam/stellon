import axios from 'axios';
import { setting } from '../constants/setting';

export const axiosPublic = axios.create({
  baseURL: `${setting.baseURL}`,
});
