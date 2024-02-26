import React from 'react';

import { ActionFunctionArgs, redirect } from 'react-router-dom';
import { createPost, updatePost } from '../../apis/post';
import validatePostData from '../../validation/postValidation';
import withAuth from '../../hocs/withAuth';
import { getImages } from '../../redux/slices/updateImageSlice';
import store from '../../redux/store';
import PostForm from './PostForm';

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
      const filteredDocumentDto = documentDto.map((document) => {
        if (document.image) {
          return { image: document.image };
        }
        return { awsS3Url: document.awsS3Url };
      });
      console.log(filteredDocumentDto);
      const imageChanged = !!documentDto[0].image;
      const data = {
        id: Number(postId),
        content,
        hashTags: hashtag,
        editedImages: filteredDocumentDto,
        imageChanged,
      };
      res = await updatePost(data);
    }
    if (res && res.status === 200) {
      return redirect('/post');
    }
  } catch (err) {
    return redirect('/post');
  }

  return null;
};
export default NewPost;
