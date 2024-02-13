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
  },
});

export const { LOGIN, LOGOUT } = userSlice.actions;

export default userSlice.reducer;
