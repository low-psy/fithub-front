import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './slices/mapSlice';
import paymentReducer from './slices/paymentSlice';
import commentReducer from './slices/commentSlice';
import profileDropdownReducer from './slices/profileDropdownSlice';
import userReducer from './slices/userSlice';
import updateImageReducer from './slices/updateImageSlice';
import userInfosReducer from './slices/userInfos';
import chatReducer from './slices/chatSlice';

const store = configureStore({
  reducer: {
    map: mapReducer,
    payment: paymentReducer,
    comment: commentReducer,
    profileDropdown: profileDropdownReducer,
    user: userReducer,
    images: updateImageReducer,
    userInfos: userInfosReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
