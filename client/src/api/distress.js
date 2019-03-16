import axios from 'axios';
import qs from 'query-string';

export const getAllDistress = ({ long, lat, distance = 1000 }) => {
  return axios.get(`/v1/distress?${qs.stringify({ long, lat, distance})}`);
}

