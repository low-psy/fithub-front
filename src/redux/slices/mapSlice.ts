import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialMapLoaderState } from '../initialStates/initialStates';
import type { RootState } from '../store';

export const mapSlice = createSlice({
  name: 'map',
  initialState: initialMapLoaderState,
  reducers: {
    SET_MAP_LOADED: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { SET_MAP_LOADED } = mapSlice.actions;

export const getMapLoaded = (state: RootState) => state.map.isLoaded;

export default mapSlice.reducer;
