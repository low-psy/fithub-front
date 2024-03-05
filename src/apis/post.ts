import { AxiosResponse } from 'axios';
import { authAxios, defaultAxios } from './axios';
import { PagePostOutlineDto } from '../types/swagger/model/pagePostOutlineDto';
import { LikesBookmarkStatusDto } from '../types/swagger/model/likesBookmarkStatusDto';
import { PagePostInfoDto } from '../types/swagger/model/pagePostInfoDto';
import { PostRequestDto } from '../types/swagger/model/postRequestDto';
import { LikedUsersInfoDto } from '../types/swagger/model/likedUsersInfoDto';
import { PostInfoDto } from '../types/swagger/model/postInfoDto';
import { PageParentCommentInfoDto } from '../types/swagger/model/pageParentCommentInfoDto';
import { CommentInfoDto } from '../types/swagger/model/commentInfoDto';
import { PostUpdateDto } from '../types/swagger/model/postUpdateDto';
import { PostCreateDto } from '../types/swagger/model/postCreateDto';

/**
 * [POST] 게시물 생성
 * content, image, hashtag를 받아서 서버로 전달
 * @param content
 * @param image
 * @param hashtag
 * @returns 일단 response 반환
 */

export const createPost = async (data: PostCreateDto) => {
  const response = await authAxios.post('/users/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const updatePost = async (data: PostUpdateDto) => {
  const response = await authAxios.put('/users/posts', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const deletePost = async (id: number) => {
  const response = await authAxios.delete(`/users/posts?postId=${id}`, {
    headers: {},
  });
  return response;
};

export const getPost = async (): Promise<AxiosResponse<PagePostInfoDto>> => {
  return defaultAxios.get<PagePostOutlineDto>('/posts?page=0&size=10');
};

export const getBookedPost = async (): Promise<
  AxiosResponse<PagePostInfoDto>
> => {
  return authAxios.get<PagePostInfoDto>(
    '/users/posts/bookmarks?page=0&size=10',
  );
};

export const getLikedPost = async (): Promise<
  AxiosResponse<PagePostInfoDto>
> => {
  return authAxios.get<PagePostInfoDto>('/users/posts/likes?page=0&size=10');
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
