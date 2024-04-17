import React from 'react';

import { ActionFunctionArgs, redirect, useNavigate } from 'react-router-dom';
import { createPost, updatePost } from '../../apis/post';
import validatePostData from '../../validation/postValidation';
import withAuth from '../../hocs/withAuth';
import { getImages } from '../../redux/slices/updateImageSlice';
import store from '../../redux/store';
import PostForm from './PostForm';
import { errorFunc } from '../../utils/util';
import { useAppSelector } from '../../hooks/reduxHooks';

function NewPost() {
  const { isLogin } = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  if (!isLogin) {
    navigate('/login');
  }
  return <PostForm useCase="post" />;
}

export const loader = async () => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const useCase = url.searchParams.get('useCase');
  const formData = await request.formData();
  const content = formData.get('content') as string;
  const images = formData.getAll('image') as File[];
  const hashtag = formData.get('hashtag') as string;
  const postId = formData.get('id') as string;
  const imageDeleted = (formData.get('imgDeleted') as string) === 'true';

  const validationErrors = validatePostData(content, images, hashtag);
  console.log(content, images, hashtag);
  if (
    (validationErrors?.content ||
      validationErrors?.hashtag ||
      validationErrors?.images) &&
    useCase !== 'put'
  ) {
    return validationErrors;
  }
  let res;
  try {
    if (useCase === 'post') {
      const data = {
        content,
        hashTags: hashtag,
        images,
      };
      res = await createPost(data);
    } else {
      const documentDto = getImages(store.getState());
      const existingImages: string[] = [];
      const newImages: Blob[] = [];
      documentDto.forEach((document) => {
        if (document.image) {
          newImages.push(document.image);
        } else {
          existingImages.push(document.awsS3Url as string);
        }
      });
      const imageAdded = newImages.length > 0;
      const imageChanged = imageDeleted || imageAdded;
      const data = {
        id: Number(postId),
        content,
        hashTags: hashtag,
        newImages,
        existingImages,
        imageDeleted,
        imageAdded,
        imageChanged,
      };
      res = await updatePost(data);
    }
    if (res && res.status === 200) {
      console.log('success');
      return redirect('/post');
    }
  } catch (err) {
    errorFunc(err);
    console.error(err);
    return redirect('/newpost');
  }

  return null;
};
export default NewPost;
