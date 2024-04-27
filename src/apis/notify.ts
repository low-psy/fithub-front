import { authAxios } from './axios';

export const fetchNotification = async () => {
  const res = await authAxios.get('/notify/all?page=0&size=5');
  return res.data;
};

export const checkReadNotification = async (notifyId: number) => {
  await authAxios.put(`/notify/select/status/read?notifyId=${notifyId}`);
};
