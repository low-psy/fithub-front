import { authAxios } from './axios';

export const fetchChatList = async () => {
  const res = await authAxios.get('/chatroom/list');
  return res.data;
};

export const createChat = async (receiverId: number) => {
  await authAxios.post('/chatroom/create', { receiverId });
};
