import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const api = axios.create({
  baseURL: 'http://192.168.1.82:8000/api', // ANDROID EMULATOR
   //baseURL: 'http://127.0.0.1:8000/api', // WEB
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.request.use(request => {
  console.log('REQUEST:', request);
  return request;
});

api.interceptors.response.use(
  response => {
    console.log('RESPONSE:', response);
    return response;
  },
  error => {
    console.log('ERROR:', error.response);
    throw error;
  }
);
