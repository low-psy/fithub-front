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
  image: FormDataEntryValue[],
  hashtag: string,
) => {
  const data = { content, images: image, hashtags: hashtag };
  const response = await authAxios.post('/posts', data);
  return response;
};

export const getPost = async () => {
  const response = await authAxios.get('/post');
  return response;
};
