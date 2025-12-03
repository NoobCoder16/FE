// src/api/client.ts

import axios from 'axios';
import { Platform } from 'react-native';


const PORT = '8000'; // Python(FastAPI) 서버 포트 (필요시 변경)

const BASE_URL = Platform.select({
  android: `http://10.0.2.2:${PORT}`, 
  ios: `http://localhost:${PORT}`,
});

const client = axios.create({
// src/api/client.ts

import axios from 'axios';
import { Platform } from 'react-native';


const PORT = '8000'; // Python(FastAPI) 서버 포트 (필요시 변경)

const BASE_URL = Platform.select({
  android: `http://10.0.2.2:${PORT}`, 
  ios: `http://localhost:${PORT}`,
});

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAccessToken = (token: string | null) => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common['Authorization'];
  }
};

// 요청 로그 확인용 (디버깅)
client.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

client.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response.data, null, 2));
  return response;
});

export default client;