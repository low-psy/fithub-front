import React from 'react';
import PostHeader from './post-header/PostHeader';
import PostMain from './post-main/PostForm';
import HeaderComponent from '../HeaderComponent';
import MainComponent from '../MainComponent';

const Post: React.FunctionComponent = () => {
  return (
    <div>
      <HeaderComponent>
        <PostHeader />
      </HeaderComponent>
      <MainComponent>
        <PostMain />
      </MainComponent>
    </div>
  );
};

export default Post;
