import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/common';
import { Post } from '../types/post';
import { authAxios } from './axios';

/**
 * [POST] 게시물 생성
 * content, image, hashtag를 받아서 서버로 전달
 * @param content
 * @param image
 * @param hashtag
 * @returns 일단 response 반환
 */

type FormDataEntryValue = string | File;

export const createPost = async (
  content: string,
  images: FormDataEntryValue[],
  hashtag: string,
) => {
  const formData = new FormData();
  images.forEach((image) => {
    formData.append(`images`, image);
  });
  formData.append('content', content);
  formData.append('hashTags', hashtag);

  const response = await authAxios.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const updatePost = async (
  id: string,
  content: string,
  editedImages: FormDataEntryValue[],
  hashtag: string,
  imageChanged: boolean,
) => {
  const formData = new FormData();
  editedImages.forEach((image, index) => {
    formData.append(`image[${index}]`, image);
  });
  formData.append('content', content);
  formData.append('hashTags', hashtag);
  formData.append('id', id);
  formData.append('imageChanged', imageChanged.toString());

  const response = await authAxios.put('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const deletePost = async (id: string) => {
  const response = await authAxios.delete(`/posts?postId=${id}`, {
    headers: {},
  });
  return response;
};

export const getPost = async (): Promise<AxiosResponse<ApiResponse<Post>>> => {
  return authAxios.get<ApiResponse<Post>>('/posts?page=0&size=10');
};

export const getMyPost = async (): Promise<
  AxiosResponse<ApiResponse<Post>>
> => {
  return authAxios.get<ApiResponse<Post>>('/posts?');
};

export const postLike = async (id: string) => {
  return authAxios.post(`/posts/likes?postId=${id}`);
};

export const deleteLike = async (id: string) => {
  return authAxios.delete(`/posts/likes?postId=${id}`);
};

export const postBook = async (id: string) => {
  return authAxios.post(`/posts/bookmark?postId=${id}`);
};

export const deleteBook = async (id: string) => {
  return authAxios.delete(`/posts/bookmark?postId=${id}`);
};

export const postComment = async (
  content: string,
  postId: number,
  parentCommentId: number,
) => {
  const data = {
    content,
    postId,
    parentCommentId,
  };
  return authAxios.post('/comments', {
    content: 'test 입니다',
    postId: 3,
  });
};
