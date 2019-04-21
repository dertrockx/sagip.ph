import axios from 'axios'

const api = axios.create({
  baseURL: process.env.API_URL || 'http://localhost:8081',
  withCredentials: true,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  }
});

export default api;

export * from './distress';
export * from './auth';
