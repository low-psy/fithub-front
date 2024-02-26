import { INewPostError } from '../types/form';

const validatePostData = (
  content: string,
  images: File[],
  hashtag: string,
): INewPostError | null => {
  let error = {};
  if (content.replace(/ /g, '').length < 2) {
    error = {
      ...error,
      content: '최소 2글자 이상의 내용을 입력해주어야 합니다 ',
    };
  }
  if (images.length <= 1 && images.filter((v) => v.name !== '').length === 0) {
    error = { ...error, images: '최소 1개의 이미지를 업로드 해주셔야 합니다' };
  }

  if (images.length > 10) {
    error = { ...error, images: '이미지는 최대 10개까지 업로드 가능합니다' };
  }
  return error;
};

export default validatePostData;
