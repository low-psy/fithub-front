import React, { useState } from 'react';
import Post from './Post';

const Posts = () => {
  const [target, setTarget] = useState<string>('posts');

  const setTargetToPosts = () => {
    setTarget('posts');
  };

  const setTargetToComments = () => {
    setTarget('comments');
  };

  const targetCSS =
    'flex h-10 w-full cursor-pointer items-center justify-center bg-main font-semibold text-white';
  const nonTargetCss =
    'flex h-10 w-full cursor-pointer items-center justify-center';

  return (
    <div className="flex flex-col">
      <p className="border-b border-gray-300 text-lg font-semibold ">
        내가 쓴 글
      </p>
      <div className="mb-4 flex w-full flex-row">
        <div
          aria-hidden
          className={target === 'posts' ? targetCSS : nonTargetCss}
          onClick={setTargetToPosts}
        >
          <p className="">게시물</p>
        </div>
        <div
          aria-hidden
          className={target === 'comments' ? targetCSS : nonTargetCss}
          onClick={setTargetToComments}
        >
          <p>댓글</p>
        </div>
      </div>
      {target === 'posts' && <Post />}
    </div>
  );
};

export default Posts;
