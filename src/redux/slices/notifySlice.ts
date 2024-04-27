import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

const notifySlice = createSlice({
  name: 'notify',
  initialState: {
    isNotifyOpen: false,
  },
  reducers: {
    SET_IS_NOTIFY_OPEN: (state, { payload }) => {
      state.isNotifyOpen = payload;
    },
  },
});

export const { SET_IS_NOTIFY_OPEN } = notifySlice.actions;

export const getIsNotifyOpen = (state: RootState) => state.notify;

export default notifySlice.reducer;
