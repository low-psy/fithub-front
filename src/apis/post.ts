import { AxiosResponse } from 'axios';
import { ApiResponse } from '../types/common';
import { Post } from '../types/post';
import { authAxios, defaultAxios } from './axios';
import { PagePostOutlineDto } from '../types/swagger/model/pagePostOutlineDto';
import { LikesBookmarkStatusDto } from '../types/swagger/model/likesBookmarkStatusDto';
import { PostDetailInfoDto } from '../types/swagger/model/postDetailInfoDto';
import { PostOutlineDto } from '../types/swagger/model/postOutlineDto';
import { PagePostInfoDto } from '../types/swagger/model/pagePostInfoDto';
import { PostRequestDto } from '../types/swagger/model/postRequestDto';
import { LikedUsersInfoDto } from '../types/swagger/model/likedUsersInfoDto';
import { PostInfoDto } from '../types/swagger/model/postInfoDto';
import { PageParentCommentInfoDto } from '../types/swagger/model/pageParentCommentInfoDto';
import { CommentInfoDto } from '../types/swagger/model/commentInfoDto';

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

export const getPost = async (): Promise<AxiosResponse<PagePostInfoDto>> => {
  return defaultAxios.get<PagePostOutlineDto>('/posts?page=0&size=10');
};

export const getDetailPost = async (
  postId: number,
): Promise<AxiosResponse<PostInfoDto>> => {
  return authAxios.get<PostInfoDto>(`/posts/${postId}`);
};

export const getLikeBook = async (
  postRequestDtos: PostRequestDto[] | undefined,
): Promise<AxiosResponse<LikesBookmarkStatusDto[]>> => {
  return authAxios.post<LikesBookmarkStatusDto[]>(
    '/users/posts/status/likes-bookmarks',
    postRequestDtos,
  );
};

export const getLikes = async (
  postRequestDtos: PostRequestDto[] | undefined,
): Promise<AxiosResponse<LikedUsersInfoDto[]>> => {
  return authAxios.post<LikedUsersInfoDto[]>('/posts/likes', postRequestDtos);
};

export const getDetailLikeBook = async (): Promise<
  AxiosResponse<LikesBookmarkStatusDto>
> => {
  return authAxios.post<LikesBookmarkStatusDto>(
    '/posts/like-and-bookmark-status',
  );
};

export const getMyPost = async (): Promise<
  AxiosResponse<ApiResponse<Post>>
> => {
  return authAxios.get<ApiResponse<Post>>('/posts?');
};

export const postLike = async (id: number) => {
  return authAxios.post(`/users/posts/likes?postId=${id}`);
};

export const deleteLike = async (id: number) => {
  return authAxios.delete(`/users/posts/likes?postId=${id}`);
};

export const postBook = async (id: number) => {
  return authAxios.post(`/users/posts/bookmarks?postId=${id}`);
};

export const deleteBook = async (id: number) => {
  return authAxios.delete(`/users/posts/bookmarks?postId=${id}`);
};

export const postComment = async (
  content: string,
  postId: number,
  parentCommentId: number | null,
) => {
  const data = {
    content,
    postId,
    parentCommentId,
  };
  return authAxios.post('/users/posts/comments', data);
};

export const getParentComments = async (
  postId: number,
): Promise<AxiosResponse<PageParentCommentInfoDto>> => {
  return authAxios.get<PageParentCommentInfoDto>(`/posts/${postId}/comments`);
};

export const getChildComments = async (
  postId: number,
  commentId: number,
): Promise<AxiosResponse<CommentInfoDto>> => {
  return authAxios.get<CommentInfoDto>(
    `/posts/${postId}/comments/${commentId}`,
  );
};
