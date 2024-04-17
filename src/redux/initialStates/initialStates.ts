import { PostDocumentUpdateDto } from '../../types/swagger/model/postDocumentUpdateDto';
import { ProfileDto } from '../../types/swagger/model/profileDto';
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
  payMethod: '',
  merchantUid: '',
  impUid: '',
  reservationId: 0,
};

export const initialCommentState: CommentState = {
  replyTo: '',
  selectReplyId: null,
  comment: '',
};

export const initialUpdateImageState: PostDocumentUpdateDto[] = [];

export const initialDropdownState: IDropdownState = {
  isOpen: false,
};

export const initialUserState: IUserState = {
  isLogin: false,
  role: 'guest',
  profileUrl: '',
};

export const initialUserInfos: ProfileDto = {
  name: '',
  nickname: '',
  email: '',
  phone: '',
  gender: 'UNDEFINED',
  bio: '',
  profileImg: '',
  grade: undefined,
  trainer: undefined,
};
