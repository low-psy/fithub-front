import { createSlice } from '@reduxjs/toolkit';
import { initialUserState } from '../initialStates/initialStates';

export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    LOGIN: (state) => {
      state.isLogin = true;
      state.role = 'user';
    },
    LOGOUT: (state) => {
      state.isLogin = false;
      state.role = 'guest';
    },
    SET_TRAINER: (state) => {
      state.role = 'trainer';
    },
    SET_INITAILIZE: (state) => {
      state = initialUserState;
    },
  },
});

export const { LOGIN, LOGOUT, SET_TRAINER, SET_INITAILIZE } = userSlice.actions;

export default userSlice.reducer;
