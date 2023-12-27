import React from 'react';
import { redirect } from 'react-router-dom';
import store from '../../redux/store';

const Post = () => {
  return (
    <section>
      <aside>yes</aside>
    </section>
  );
};

export const loader = () => {
  const { accessToken } = store.getState().token;
  if (accessToken === 'initial access token') {
    return redirect('/login');
  }
  return null;
};

export const action = () => {
  return null;
};

export default Post;
