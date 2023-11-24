import React, { Fragment } from 'react';
import logo from '../../../source/fithub_logo.png';

const PostHeaderTitle = () => {
  return (
    <>
      <div>
        <img className="h-full" src={logo} alt="logo" />
      </div>
      <div className="main flex items-center  text-4xl font-extrabold text-main">
        게시글 작성하기
      </div>
    </>
  );
};

export default PostHeaderTitle;
