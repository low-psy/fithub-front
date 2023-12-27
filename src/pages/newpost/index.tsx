import React from 'react';

import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { AxiosError } from 'axios';
import PostForm from './PostForm';
import store from '../../redux/store';
import { createPost } from '../../apis/post';

function NewPost() {
  return <PostForm />;
}

export const loader = async () => {
  const { accessToken } = store.getState().token;
  if (accessToken === 'initial access token') {
    return redirect('/login');
  }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const content = formData.get('content') as string;
  const images = formData.getAll('image');
  const hashtag = formData.get('hashtag') as string;

  const errors = { message: '' };

  if (!(content || images || hashtag)) {
    errors.message = '내용, 이미지, 해시태그중 하나는 입력해주셔야 됩니다';
  }

  if (images.length < 1) {
    errors.message = '이미지는 최소 1개 이상 업로드 해주셔야 합니다';
  } else if (images.length > 10) {
    errors.message = '이미지는 최대 10개 까지만 업로드 가능합니다';
  }

  if (errors.message.length) {
    return errors;
  }

  try {
    const response = await createPost(content, images, hashtag);
    if (response && response.status === 200) {
      return redirect('/');
    }
  } catch (err) {
    const error = err as unknown as AxiosError;
    console.log(error);
    if (error) {
      // eslint-disable-next-line no-alert
      alert('게시물 생성 중 문제가 생겼습니다. 다시 게시물을 생성해 주세요.');
    }
  }

  return redirect('/newpost');
};
export default NewPost;
