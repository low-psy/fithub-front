import React from 'react';
import {
  ActionFunctionArgs,
  LoaderFunction,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { AxiosError } from 'axios';

import FilterItem from '../../components/filter/FilterItem';
import useFilter from '../../hooks/filterHook';
import PostItem from '../../components/post/PostItem';
import { deletePost, getPost, updatePost } from '../../apis/post';
import validatePostData from '../../validation/postValidation';
import { LoaderData } from '../../types/training';

export const loader = (async () => {
  try {
    const response = await getPost();
    if (response && response.status === 200) {
      console.log(response);
      return response;
    }
    return response;
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const MyPost = () => {
  const PostDto = useLoaderData() as LoaderData<typeof loader>;
  console.log(PostDto);
  const {
    selectedFilter: mySelectedFilter,
    handleFilterClick: handleMyFilterClick,
  } = useFilter('게시글');
  return (
    <div className="space-y-8">
      <article className=" ">
        <div className="bg-slate-50 px-2 py-4">내 게시물</div>
        <div className="flex bg-slate-400">
          {['게시글', '댓글'].map((text) => {
            return (
              <FilterItem
                text={text}
                onClick={() => handleMyFilterClick(text)}
                className={`w-1/2 p-2 hover:bg-sub ${
                  mySelectedFilter === text ? 'bg-sub' : 'bg-slate-300'
                }`}
              />
            );
          })}
        </div>
      </article>
      {PostDto?.data.content.map((post) => (
        <PostItem {...post} postUse="update" />
      ))}
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const id = formData.get('id') as string;

  if (request.method === 'PUT') {
    const content = formData.get('content') as string;
    const images = formData.getAll('image') as File[];
    const hashtag = formData.get('hashtag') as string;
    const imageChanged =
      images.length > 0 && images.filter((v) => v.name !== '').length > 0;

    const validationErrors = validatePostData(content, images, hashtag);
    if (validationErrors) {
      return validationErrors;
    }

    try {
      const response = await updatePost(
        id,
        content,
        images,
        hashtag,
        imageChanged,
      );
      if (response && response.status === 200) {
        return redirect('/profile/mypost');
      }
    } catch (err) {
      const error = err as unknown as AxiosError;
      console.error(error);
      // Handle the error appropriately
    }
  } else if (request.method === 'DELETE') {
    try {
      const response = await deletePost(id);
      if (response && response.status === 200) {
        return redirect('/profile/mypost');
      }
    } catch (err) {
      const error = err as unknown as AxiosError;
      console.error(error);
      // Handle the error appropriately
    }
  }

  return redirect('/profile/mypost');
};

export default MyPost;
