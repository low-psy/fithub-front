import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const careerSlice = createSlice({
  name: 'career',
  initialState: { careerList: [], workingCareerId: 0 },
  reducers: {
    SET_CAREERLIST: (state, { payload }) => {
      state.careerList = payload;
    },
    SET_WORKING_CAREERID: (state, { payload }) => {
      state.workingCareerId = payload;
    },
  },
});

export const { SET_CAREERLIST, SET_WORKING_CAREERID } = careerSlice.actions;

export const getCareerList = (state: RootState) => state.career.careerList;
export const getWorkingCareerId = (state: RootState) =>
  state.career.workingCareerId;

export default careerSlice.reducer;
