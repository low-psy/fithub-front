import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialTokenState } from '../initialStates/initialStates';
import type { RootState } from '../store';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: initialTokenState,
  reducers: {
    SET_TOKEN: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    DELETE_TOKEN: (state) => {
      state.accessToken = '';
    },
  },
});

export const { SET_TOKEN, DELETE_TOKEN } = tokenSlice.actions;

export const getToken = (state: RootState) => state.token.accessToken;

export default tokenSlice.reducer;
