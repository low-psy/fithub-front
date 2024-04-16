import { authAxios } from './axios';

export const fetchChatList = async () => {
  const res = await authAxios.get('/chatroom/list');
  return res.data;
};

export const createChat = async (receiverId: number) => {
  await authAxios.post('/chatroom/create', { receiverId });
};

/**
 * @description 채팅방이 존재하는지 확인
 * @param userId
 * @returns 존재하면 true
 */
export const checkChatroomExist = async (userId: number) => {
  const res = await authAxios.get(`/chatroom/check?userId=${userId}`);
  return res;
};

/**
 * @description 채팅메시지 조회
 * @param chatRoomId
 */
export const fetchChatMsg = async (chatRoomId: number) => {
  const res = await authAxios.get(`/chatroom/message?chatRoomId=${chatRoomId}`);
  return res;
};
