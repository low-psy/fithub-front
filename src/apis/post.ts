import { PostsDto } from '../types/post';
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
    formData.append('images', image);
  });
  formData.append('content', content);
  formData.append('hashTags', hashtag);

  const response = await authAxios.post('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response;
};

export const getPost = async () => {
  const { data, status } = await authAxios.get<PostsDto>('/posts');
  return { data, status };
};
