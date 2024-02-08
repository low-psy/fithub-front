import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialPaymentState } from '../initialStates/initialStates';
import type { RootState } from '../store';

interface SelectedDates {
  startDate: string | null;
  endDate: string | null;
}

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialPaymentState,
  reducers: {
    SET_SELECTED_DATE: (state, action: PayloadAction<SelectedDates>) => {
      state.selectedDate.startDate = action.payload.startDate;
      state.selectedDate.endDate = action.payload.endDate;
    },
    SET_SELECTED_TIME: (state, action: PayloadAction<string>) => {
      state.selectedTime = action.payload;
    },
  },
});

export const { SET_SELECTED_DATE, SET_SELECTED_TIME } = paymentSlice.actions;

export const getSelectedDate = (state: RootState) => state.payment.selectedDate;

export default paymentSlice.reducer;
