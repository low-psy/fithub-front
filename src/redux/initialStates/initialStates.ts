import { ITokenState, MapState, PaymentState } from './initialStateTypes';

// eslint-disable-next-line import/prefer-default-export
export const initialTokenState: ITokenState = {
  accessToken: 'initial access token',
};

export const initialMapLoaderState: MapState = {
  isLoaded: false,
};

export const initialPaymentState: PaymentState = {
  selectedDate: { startDate: '', endDate: '' },
  selectedTime: '',
};
