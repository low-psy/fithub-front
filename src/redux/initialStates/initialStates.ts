import {
  CommentState,
  IDropdownState,
  ITokenState,
  IUserState,
  MapState,
  PaymentState,
} from './initialStateTypes';

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

export const initialDropdownState: IDropdownState = {
  isOpen: false,
};

export const initialUserState: IUserState = {
  isLogin: false,
  role: 'guest',
};
