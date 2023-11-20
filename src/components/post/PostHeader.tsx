import React from 'react';
import NavMenu from './NavMenu';
import PostHeaderTitle from './PostHeaderTtile';
import BookmarkIcon from '../utilities/icons/BookmarkIcon';
import ChatIcon from '../utilities/icons/ChatIcon';
import ProfileIcon from '../utilities/icons/ProfileIcon';

const PostHeader = () => {
  const icons = [BookmarkIcon, ChatIcon, ProfileIcon];
  return (
    <div className="flex h-14 justify-between">
      <PostHeaderTitle />
      <NavMenu>{icons}</NavMenu>
    </div>
  );
};

export default PostHeader;
