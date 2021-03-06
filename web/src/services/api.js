import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`,
});

api.interceptors.request.use(async (config) => {
  const token = getToken();
  if (token) {
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = token;
  }
  return config;
});

export default api;
