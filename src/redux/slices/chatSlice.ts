import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const chatSlice = createSlice({
  name: 'chat',
  initialState: { chattingRoomId: undefined },
  reducers: {
    SET_CHATTING_ROOM_ID: (state, { payload }) => {
      state.chattingRoomId = payload;
    },
  },
});

export const { SET_CHATTING_ROOM_ID } = chatSlice.actions;

export const getChattingRoomId = (state: RootState) =>
  state.chat.chattingRoomId;

export default chatSlice.reducer;
