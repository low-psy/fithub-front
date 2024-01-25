interface ValidationErrors {
  message: string;
}

const validatePostData = (
  content: string,
  images: File[],
  hashtag: string,
): ValidationErrors | null => {
  if (!content && images.length === 0 && !hashtag) {
    return { message: '내용, 이미지, 해시태그 중 하나는 입력해주셔야 합니다.' };
  }
  if (images.length <= 1 && images.filter((v) => v.name !== '').length === 0) {
    return { message: '이미지는 최소 1개 이상 업로드 해주셔야 합니다.' };
  }

  if (images.length > 10) {
    return { message: '이미지는 최대 10개까지만 업로드 가능합니다.' };
  }

  return null;
};

export default validatePostData;
