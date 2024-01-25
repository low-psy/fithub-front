import React from 'react';
import {
  redirect,
  Link,
  LoaderFunction,
  useLoaderData,
} from 'react-router-dom';
import { AxiosError } from 'axios';
import store from '../../redux/store';
import FilterLayout from '../../components/filter/FilterLayout';
import PostItem from '../../components/post/PostItem';
import { LoaderData } from '../../types/training';
import { getPost } from '../../apis/post';

export const loader = (async () => {
  const { accessToken } = store.getState().token;
  if (accessToken === 'initial access token') {
    return redirect('/login');
  }
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

const Post = () => {
  const PostDto = useLoaderData() as LoaderData<typeof loader>;

  return (
    <div className="flex gap-8 space-y-4 md:space-y-0">
      <FilterLayout>
        <div className="space-y-12">
          <div>
            <Link
              to="/newpost"
              className=" block break-keep bg-accent_sub p-4 text-center text-3xl font-extrabold text-accent"
            >
              게시물 작성하기
            </Link>
          </div>
          <div>chat</div>
        </div>
      </FilterLayout>
      <section className="w-[728px] space-y-12">
        {PostDto.data.content.map((post) => (
          <PostItem {...post} />
        ))}
      </section>
    </div>
  );
};

export const action = () => {
  return null;
};

export default Post;
