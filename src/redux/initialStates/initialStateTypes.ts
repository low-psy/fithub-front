import { PaymentReqDto } from '../../types/swagger/model/paymentReqDto';
import { ROLE } from '../../types/user';

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
export interface PaymentState extends PaymentReqDto {
  selectedDate: SelectedDates;
  selectedTime: string;
}

export interface CommentState {
  replyTo: string;
  selectReplyId: number | null;
}

export interface IDropdownState {
  isOpen: boolean;
}

export interface IUserState {
  isLogin: boolean;
  role: ROLE;
}
