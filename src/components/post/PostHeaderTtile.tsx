import React from 'react';
import logo from '../../source/fithub_logo.png';

const PostHeaderTitle = () => {
  return (
    <div className="flex">
      <div>
        <img className="h-full" src={logo} alt="logo" />
      </div>
      <div className="flex items-center">게시글 작성하기</div>
    </div>
  );
};

export default PostHeaderTitle;
