import React from 'react';

import { ActionFunctionArgs, redirect } from 'react-router-dom';
import PostForm from '../../components/post/PostForm';
import { createPost } from '../../apis/post';
import validatePostData from '../../validation/postValidation';
import { useAppSelector } from '../../hooks/reduxHooks';
import withAuth from '../../hocs/withAuth';

function NewPost() {
  return <PostForm useCase="create" />;
}

export const loader = async () => {
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
export default withAuth(NewPost, 'user');
