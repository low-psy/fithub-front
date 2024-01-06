import {
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
} from 'react';

export interface PostInputProps {
  children: ReactElement;
  spanText: string;
  htmlFor: string;
  titleText: string;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customProp?: string;
}

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  customProp?: string;
}

export interface PForm {
  title: string;
  content: string;
  image: string;
  keyword: string;
}

export interface LikeDto {
  name: string;
  image: string;
}

export interface ReplyDto {
  name: string;
  image: string;
  comment: string;
}

export interface CommentDto {
  name: string;
  image: string;
  comment: string;
  reply?: ReplyDto[];
}

export interface PostData {
  content?: string;
  postImages: string[];
  likes?: LikeDto[];
  comments?: CommentDto[];
  hashtags?: string[];
  profileImage: string;
  profileName: string;
  date: string;
}

export interface PostsDto {
  totalElements: number;
  content: PostData[];
}
