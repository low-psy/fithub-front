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
    SET_PROFILE_URL: (state, { payload }) => {
      state.profileUrl = payload;
    },
  },
});

export const { LOGIN, LOGOUT, SET_TRAINER, SET_INITAILIZE, SET_PROFILE_URL } =
  userSlice.actions;

export default userSlice.reducer;
