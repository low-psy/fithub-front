import React from 'react';
import { useOutletContext } from 'react-router-dom';
import PostItem from './PostItem';
import UndefinedCover from '../../components/common/UndefinedCover';
import { PostOutletProps } from '../../types/post';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';

interface PostContainerProps {
  data: PostInfoDto[];
  loaderIndicator: React.MutableRefObject<HTMLDivElement | null>;
}

const PostContainer: React.FC<PostContainerProps> = ({
  data,
  loaderIndicator,
}) => {
  const { bookAndLikes, likedInfos, getLikeAndBookInfo } =
    useOutletContext<PostOutletProps>();
  return (
    <div className="flex gap-8 space-y-4 md:space-y-0">
      <section className="w-full">
        {!data[0] && (
          <div className="relative h-[400px] bg-gray-100">
            <UndefinedCover>생성한 게시물이 없습니다</UndefinedCover>
          </div>
        )}
        {data?.map((post, index) => {
          const likeAndBook = bookAndLikes[index];
          const likedInfo = likedInfos[index];
          return (
            <PostItem
              key={post.postId}
              {...post}
              bookAndLikes={likeAndBook}
              likedUsers={likedInfo?.likedUsers}
              onClick={() => getLikeAndBookInfo(data)}
            />
          );
        })}
        <div ref={loaderIndicator} />
      </section>
    </div>
  );
};

export default PostContainer;
