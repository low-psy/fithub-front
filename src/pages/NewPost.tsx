import React from 'react';
import { ActionFunctionArgs, redirect } from 'react-router-dom';

import Post from '../components/post/Post';
import RootComponent from '../components/RootComponent';

const NewPost = () => {
  return (
    <RootComponent>
      <Post />
    </RootComponent>
  );
};
export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const image = formData.get('image');
  // const keyword = formData.get('keyword');
  const errors = { message: '' };

  if (!(title || content || image)) {
    errors.message = '제목, 내용, 이미지 중에 하나는 입력해 주세요!';
  }

  if (errors.message.length) {
    return errors;
  }

  return redirect('/');
};
export default NewPost;
