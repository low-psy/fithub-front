import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import mapReducer from './slices/mapSlice';
import paymentReducer from './slices/paymentSlice';

const store = configureStore({
  reducer: { token: tokenReducer, map: mapReducer, payment: paymentReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
