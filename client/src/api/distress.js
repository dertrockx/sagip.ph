import api from './index';
import qs from 'query-string';

export const getAllDistress = ({ long, lat, distance = 1000, age }) => {
  return api.get(`/v1/distress?${qs.stringify({ long, lat, distance, age })}`);
}

export const getComments = distressId => {
  return api.get(`/v1/distress/${distressId}/comment`);
}

export const addCommentToDistress = (distressId, { content }) => {
  return api.post(`/v1/distress/${distressId}/comment`, { content });
}