import React from 'react';

import { ActionFunctionArgs, redirect } from 'react-router-dom';
import PostForm from '../../components/post/PostForm';
// import store from '../../redux/store';
import { createPost } from '../../apis/post';
import validatePostData from '../../validation/postValidation';

function NewPost() {
  return <PostForm useCase="create" />;
}

export const loader = async () => {
  // const { accessToken } = store.getState().token;
  // if (accessToken === 'initial access token') {
  //   return redirect('/login');
  // }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const content = formData.get('content') as string;
  const images = formData.getAll('image') as File[];
  const hashtag = formData.get('hashtag') as string;

  const validationErrors = validatePostData(content, images, hashtag);
  if (validationErrors) {
    return validationErrors;
  }

  try {
    const response = await createPost(content, images, hashtag);
    if (response && response.status === 200) {
      return redirect('/');
    }
  } catch (err) {
    console.log(err);
  }

  return redirect('/newpost');
};
export default NewPost;
