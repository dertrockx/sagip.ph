import api from './index';
import qs from 'query-string';

export const getAllDistress = ({ long, lat, distance = 1000 }) => {
  return api.get(`/v1/distress?${qs.stringify({ long, lat, distance})}`);
}

