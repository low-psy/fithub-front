import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chattingRoomId: undefined,
    isChatListOpen: false,
    chatList: [],
  },
  reducers: {
    SET_CHATTING_ROOM_ID: (state, { payload }) => {
      state.chattingRoomId = payload;
    },
    SET_IS_CHATLIST_MODAL_OPEN: (state, { payload }) => {
      state.isChatListOpen = payload;
    },
    SET_CHAT_LIST: (state, { payload }) => {
      state.chatList = payload;
    },
  },
});

export const {
  SET_CHATTING_ROOM_ID,
  SET_IS_CHATLIST_MODAL_OPEN,
  SET_CHAT_LIST,
} = chatSlice.actions;

export const getChattingRoomId = (state: RootState) =>
  state.chat.chattingRoomId;
export const getIsChatListModalOpen = (state: RootState) =>
  state.chat.isChatListOpen;
export const getChatList = (state: RootState) => state.chat.chatList;

export default chatSlice.reducer;
