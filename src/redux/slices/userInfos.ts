import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUserInfos } from '../initialStates/initialStates';
import { ProfileDto } from '../../types/swagger/model/profileDto';

export const userInfosSlice = createSlice({
  name: 'user',
  initialState: initialUserInfos,
  reducers: {
    SET_USER_INFOS(state, action: PayloadAction<{ userInfos: ProfileDto }>) {
      state = action.payload.userInfos;
    },
  },
});

export const { SET_USER_INFOS } = userInfosSlice.actions;

export default userInfosSlice.reducer;
