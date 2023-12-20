import { configureStore } from '@reduxjs/toolkit';
import newpost from '../redux/slices/newpost';

export const store = configureStore({
  reducer: { newpost },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
