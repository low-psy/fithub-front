import React from 'react';

import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { createPost, updatePost } from '../../apis/post';
import validatePostData from '../../validation/postValidation';
import withAuth from '../../hocs/withAuth';
import { getImages } from '../../redux/slices/updateImageSlice';
import store from '../../redux/store';
import PostForm from './PostForm';
import { errorFunc } from '../../utils/util';

function NewPost() {
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
  const imgDeleted = formData.get('imgDeleted') as string;
  console.log(imgDeleted);

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
      const unModifiedImages: string[] = [];
      const newImages: Blob[] = [];
      documentDto.forEach((document) => {
        if (document.image) {
          newImages.push(document.image);
        } else {
          unModifiedImages.push(document.awsS3Url as string);
        }
      });
      const imgAdded = newImages.length > 1;
      const imgChanged = !!documentDto[0].image;
      const data = {
        id: Number(postId),
        content,
        newImages,
        unModifiedImages,
        hashTags: hashtag,
        imgChanged,
        imgAdded,
        imgDeleted,
      };
      res = await updatePost(data);
    }
    if (res && res.status === 200) {
      console.log('success');
      return redirect('/');
    }
  } catch (err) {
    errorFunc(err);
    console.error(err);
    return redirect('/post');
  }

  return null;
};
export default NewPost;
