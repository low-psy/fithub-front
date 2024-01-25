export interface ITokenState {
  accessToken: string;
}

export interface MapState {
  isLoaded: boolean;
}

export interface SelectedDates {
  startDate: string | null;
  endDate: string | null;
}
export interface PaymentState {
  selectedDate: SelectedDates;
  selectedTime: string;
}
