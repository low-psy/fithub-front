import React from 'react';

const LikesSection: React.FC<{
  likes: number;
  onLikesClick: () => void;
}> = ({ likes, onLikesClick }) => {
  return (
    <h3
      onClick={onLikesClick}
      className="cursor-pointer font-bold"
      onKeyUp={onLikesClick}
      role="presentation"
    >
      좋아요 {likes}개
    </h3>
  );
};

export default LikesSection;
