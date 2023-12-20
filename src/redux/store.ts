import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import newpostReducer from './slices/newpost';

const store = configureStore({
  reducer: { newpost: newpostReducer, token: tokenReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
