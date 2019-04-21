import api from './index';

export const getSession = () => {
  return api.post('/v1/session');
}

export const confirmLogin = ({ userId, code }) => {
  return api.post(`/v1/confirm/${userId}`, { code, intent: 'LOGIN' });
}

export const login = ({ phoneNumber }) => {
  return api.post('/v1/login', { phoneNumber });
}

export const logout = () => {
  return api.post('/v1/logout');
}
