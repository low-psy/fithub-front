import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialUpdateImageState } from '../initialStates/initialStates';
import type { RootState } from '../store';

export const updateImageSlice = createSlice({
  name: 'updateImage',
  initialState: initialUpdateImageState,
  reducers: {
    SET_UPDATE_IMAGE: (
      state,
      action: PayloadAction<{ image: File; index: number | undefined }>,
    ) => {
      const { index, image } = action.payload;
      if (typeof index === 'number') {
        state[index] = { ...state[index], image };
      } else {
        state = [...state, { awsS3Url: '', image }];
      }
      return state;
    },
    SET_DELETE_IMAGE: (state, action: PayloadAction<{ index: number }>) => {
      const { index } = action.payload;
      return state.filter((_, i) => i !== index);
    },
    INITIALIZE_IMAGE: (
      state,
      action: PayloadAction<{ awsS3Url: string[] }>,
    ) => {
      const { awsS3Url } = action.payload;
      if (!awsS3Url) {
        return initialUpdateImageState;
      }
      const result = awsS3Url.map((awsS3Url) => {
        return { awsS3Url, image: undefined };
      });
      return result;
    },
  },
});

export const { SET_UPDATE_IMAGE, INITIALIZE_IMAGE, SET_DELETE_IMAGE } =
  updateImageSlice.actions;

export const getImages = (state: RootState) => state.images;

export default updateImageSlice.reducer;
