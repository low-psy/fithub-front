import { createSlice } from '@reduxjs/toolkit';
import { initialDropdownState } from '../initialStates/initialStates';
import type { RootState } from '../store';

export const porofileDropdownSlice = createSlice({
  name: 'profileDropdown',
  initialState: initialDropdownState,
  reducers: {
    TOGGLE_OPEN: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { TOGGLE_OPEN } = porofileDropdownSlice.actions;

export const getIsOpen = (state: RootState) => state.profileDropdown.isOpen;

export default porofileDropdownSlice.reducer;
