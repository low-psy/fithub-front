import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { newpost } from '../models/store/newpost';

const initialCounterState: newpost = {
  title: '',
  content: '',
  image: '',
  keyword: '',
};
export const newpostSlice = createSlice({
  name: 'newpost',
  initialState: initialCounterState,
  reducers: {
    updateNewPost: (state, action: PayloadAction<newpost>) => {
      return { ...action.payload };
    },
  },
});

export const { updateNewPost } = newpostSlice.actions;
export default newpostSlice.reducer;
