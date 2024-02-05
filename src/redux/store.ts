import { configureStore } from '@reduxjs/toolkit';
import tokenReducer from './slices/tokenSlice';
import mapReducer from './slices/mapSlice';
import paymentReducer from './slices/paymentSlice';
import commentReducer from './slices/commentSlice';

const store = configureStore({
  reducer: {
    token: tokenReducer,
    map: mapReducer,
    payment: paymentReducer,
    comment: commentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
