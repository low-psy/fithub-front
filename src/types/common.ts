import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { LoaderFunction } from 'react-router-dom';
import { LikesBookmarkStatusDto } from './swagger/model/likesBookmarkStatusDto';
import { LikedUsersInfoDto } from './swagger/model/likedUsersInfoDto';
import { PostInfoDto } from './swagger/model/postInfoDto';
import { TrainingOutlineDto } from './swagger/model/trainingOutlineDto';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customProp?: string;
}

export interface SearchInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  children?: any;
  moduleOnclick: (value: boolean) => void;
  iconText?: string;
  className?: string;
  iconClassName?: string;
  onClose?: () => void;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string;
}

export type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export interface DivProps {
  children?: any;
  className?: string;
}

export interface EventListener {
  (e: Event): void;
}

export interface LinkButtonProps {
  children?: any;
  className?: string;
  to: string;
  bg?: string;
}

export interface FilterItemsProps {
  text: string;
  isSelected?: boolean;
  onClick: () => void;
  className: string;
}

export interface FormErrors {
  title?: string;
  content?: string;
  images?: string;
  location?: string;
  quota?: string;
  price?: string;
  dateTime?: string;
}

export type LoaderData<TLoaderFn extends LoaderFunction> =
  Awaited<ReturnType<TLoaderFn>> extends Response | infer D ? D : never;

export interface refreshResData {
  accessToken: string;
  code: number;
  httpStatus: string;
  message: string;
}

export interface UserTrainingOutletProps {
  usersTrainingLike: boolean[];
  trainingInfo: TrainingOutlineDto[];
  fetchData: (page: number) => Promise<TrainingOutlineDto[] | []>;
  last: boolean | undefined;
}

export interface PostOutletProps {
  bookAndLikes: LikesBookmarkStatusDto[];
  likedInfos: LikedUsersInfoDto[];
  getLikeAndBookInfo: (data: PostInfoDto[]) => void;
  postInfo: PostInfoDto[];
  fetchData: (page: number) => Promise<PostInfoDto[] | []>;
  last: boolean | undefined;
}
