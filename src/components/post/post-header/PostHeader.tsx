import React from 'react';
import NavMenu from '../../nav/NavMenu';
import PostHeaderTitle from './PostHeaderTtile';
import NavComponent from '../../nav/NavComponent';
import NavTitle from '../../nav/NavTitle';

const PostHeader = () => {
  return (
    <NavComponent>
      <NavTitle>
        <PostHeaderTitle />
      </NavTitle>
      <NavMenu icons={['bookmark', 'chat', 'profile']} />
    </NavComponent>
  );
};

export default PostHeader;
