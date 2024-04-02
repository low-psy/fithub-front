import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: { chattingRoomId: undefined, isChatListModalOpen: false },
  reducers: {
    SET_CHATTING_ROOM_ID: (state, { payload }) => {
      state.chattingRoomId = payload;
    },
    SET_IS_CHATLIST_MODAL_OPEN: (state, { payload }) => {
      state.isChatListModalOpen = payload;
    },
  },
});

export const { SET_CHATTING_ROOM_ID, SET_IS_CHATLIST_MODAL_OPEN } =
  chatSlice.actions;

export const getChattingRoomId = (state: RootState) =>
  state.chat.chattingRoomId;
export const getIsChatListModalOpen = (state: RootState) =>
  state.chat.isChatListModalOpen;

export default chatSlice.reducer;
