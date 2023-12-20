import React from 'react';
import { ActionFunctionArgs, redirect } from 'react-router-dom';
// import store from '../redux/store';
import PostForm from '../components/post/PostForm';
// import { authAxios } from '../apis/axios';
// import { AxiosError } from 'axios';

const NewPost = () => {
  return <PostForm />;
};

export const loader = async () => {
  // const { accessToken } = store.getState().token;
  // if (accessToken === 'initial access token') {
  //   return redirect('/login');
  // }
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const title = formData.get('title');
  const content = formData.get('content');
  const image = formData.get('image');

  // const data = { title: title, content: content, image: image };
  // const keyword = formData.get('keyword');
  const errors = { message: '' };

  if (!(title || content || image)) {
    errors.message = '제목, 내용, 이미지 중에 하나는 입력해 주세요!';
  }

  if (errors.message.length) {
    return errors;
  }

  // try {
  //   const response = await authAxios.post('/post', data)
  //   if (response && response.status === 200) {
  //     return redirect('/');
  //   }
  // } catch (err) {
  //   const error = err as unknown as AxiosError;
  //   console.log(error);
  //   if (error) {
  //     // eslint-disable-next-line no-alert
  //     alert("게시물 생성 중 문제가 생겼습니다. 다시 게시물을 생성해 주세요.")
  //   }
  // }

  return redirect('/');
};
export default NewPost;
