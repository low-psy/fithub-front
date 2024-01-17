import {
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  TextareaHTMLAttributes,
} from 'react';
import { ApiResponse } from './common';

export interface PostInputProps {
  children: ReactElement | ReactNode;
  spanText: string;
  htmlFor: string;
  titleText: string;
  error?: string | undefined;
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

export interface PostLikedUser {
  likedUser: string;
  likedUserProfileUrl: string;
  likedUserBio: string;
}

export interface PostComment {
  commentId: number;
  writerNickName: string;
  content: string;
  parentCommentId: number;
  profileUrl: string;
  profileInputName: string;
  deleted: boolean;
  createdDate: string;
  childComment: string[];
}

export interface Post {
  postId: number;
  postCreatedDate: string;
  postContent: string;
  postWriter: string;
  postWriterProfileUrl: string;
  postHashTags: string[];
  postViews: number;
  postLikesCount: number;
  postLikedUser: PostLikedUser[];
  postDocumentUrls: string[];
  postCommentsCount: number;
  postComments: PostComment[];
  liked: boolean;
  bookmark: boolean;
}
