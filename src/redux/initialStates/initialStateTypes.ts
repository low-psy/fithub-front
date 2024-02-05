import { PaymentReqDto } from '../../types/swagger/model/paymentReqDto';

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
