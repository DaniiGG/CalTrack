import { api } from './api';

export const getProgressions = async () => {
  const res = await api.get('/progressions');
  return res.data;
};