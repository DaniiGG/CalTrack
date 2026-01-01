import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';

export const saveToken = async (token: string) => {
  await AsyncStorage.setItem('token', token);
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const removeToken = async () => {
  await AsyncStorage.removeItem('token');
};

export const logout = async () => {
  try {
    await api.post('/logout');
  } catch (e) {
    // aunque falle backend, seguimos limpiando
  } finally {
    await AsyncStorage.removeItem('token');
  }
};