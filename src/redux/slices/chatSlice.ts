import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface InitialType {
  chattingRoomId: number | undefined;
  isDropdownChatOpen: boolean;
  chatList: [];
  chatPartner: {
    name: string;
    imgUrl: string | null;
  };
  ws: any;
  currChatData: any;
}

const initialState: InitialType = {
  chattingRoomId: undefined,
  isDropdownChatOpen: false,
  chatList: [],
  chatPartner: {
    name: '',
    imgUrl: null,
  },
  ws: null,
  currChatData: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
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
    SET_WS: (state, { payload }) => {
      state.ws = payload;
    },
    SET_CURR_CHAT_DATA: (state, { payload }) => {
      state.currChatData = payload;
    },
  },
});

export const {
  SET_CHATTING_ROOM_ID,
  SET_IS_DROPDOWN_CHAT_OPEN,
  SET_CHAT_LIST,
  SET_CHAT_PARTNER,
  SET_WS,
  SET_CURR_CHAT_DATA,
} = chatSlice.actions;

export const getChattingRoomId = (state: RootState) =>
  state.chat.chattingRoomId;
export const getIsChatListModalOpen = (state: RootState) =>
  state.chat.isDropdownChatOpen;
export const getChatList = (state: RootState) => state.chat.chatList;
export const getChatPartner = (state: RootState) => state.chat.chatPartner;
export const getWS = (state: RootState) => state.chat.ws;
export const getCurrChatData = (state: RootState) => state.chat.currChatData;

export default chatSlice.reducer;
