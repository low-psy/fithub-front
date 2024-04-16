import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chattingRoomId: undefined,
    isDropdownChatOpen: false,
    chatList: [],
    chatPartner: {
      name: '',
      imgUrl: null,
    },
  },
  reducers: {
    SET_CHATTING_ROOM_ID: (state, { payload }) => {
      state.chattingRoomId = payload;
    },
    SET_IS_DROPDOWN_CHAT_OPEN: (state, { payload }) => {
      state.isDropdownChatOpen = payload;
    },
    SET_CHAT_LIST: (state, { payload }) => {
      state.chatList = payload;
    },
    SET_CHAT_PARTNER: (state, { payload }) => {
      state.chatPartner = payload;
    },
  },
});

export const {
  SET_CHATTING_ROOM_ID,
  SET_IS_DROPDOWN_CHAT_OPEN,
  SET_CHAT_LIST,
  SET_CHAT_PARTNER,
} = chatSlice.actions;

export const getChattingRoomId = (state: RootState) =>
  state.chat.chattingRoomId;
export const getIsChatListModalOpen = (state: RootState) =>
  state.chat.isDropdownChatOpen;
export const getChatList = (state: RootState) => state.chat.chatList;
export const getChatPartner = (state: RootState) => state.chat.chatPartner;

export default chatSlice.reducer;
