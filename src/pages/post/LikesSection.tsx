import React from 'react';
import { LikesInfoDto } from '../../types/swagger/model/likesInfoDto';

const LikesSection: React.FC<{
  likes: LikesInfoDto[] | undefined;
  onLikesClick: () => void;
}> = ({ likes, onLikesClick }) => {
  return (
    <button onClick={onLikesClick} className="font-bold" type="button">
      {likes && likes.length > 0 ? (
        <ul className="flex items-center gap-x-2">
          {likes?.map((likeDto, index) => {
            const isLastIndex = index === likes.length - 1;
            return (
              <li
                key={likeDto.nickname}
                className={`-mr-4 aspect-square w-8 overflow-hidden rounded-full border-[1px] border-gray-300  ${isLastIndex && 'mr-0'} `}
              >
                <img
                  src={likeDto.profileUrl}
                  alt="좋아요 누른 사람의 프로필"
                  className="h-full w-full object-cover"
                />
              </li>
            );
          })}
          <div className="flex items-center gap-x-1">
            <p>Liked by</p>
            <p className="mt-[3px] text-sm">
              {likes && likes?.length >= 2
                ? `${likes[0].nickname} 그리고 여러명`
                : likes?.[0].nickname}
            </p>
          </div>
        </ul>
      ) : (
        '좋아요 0개'
      )}
    </button>
  );
};

export default LikesSection;
