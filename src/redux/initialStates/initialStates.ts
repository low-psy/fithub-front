import {
  CommentState,
  ITokenState,
  MapState,
  PaymentState,
} from './initialStateTypes';

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
  trainingId: 0,
  pg: '',
  payMethod: '',
  merchantUid: '',
  impUid: '',
  reservationId: 0,
};

export const initialCommentState: CommentState = {
  replyTo: '',
  selectReplyId: null,
};
