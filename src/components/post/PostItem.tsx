import React, { useState } from 'react';
import HeartIcon from '../../assets/icons/HeartIcon';
import CommentIcon from '../../assets/icons/CommentIcon';
import { PostData } from '../../types/post';
import ImageSlider from '../common/ImageSlice';
import DefaultModal from '../common/module/DefaultModal';
import Comment from '../common/Comment';

const PostItem: React.FunctionComponent<PostData> = ({
  content,
  hashtags,
  comments,
  likes,
  date,
  postImages,
  profileName,
  profileImage,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <article className="space-y-4">
      <div className="space-y-4  bg-white p-4 shadow-sm drop-shadow-xl">
        <div className="flex gap-4">
          <div className="aspect-square w-12 overflow-hidden rounded-full bg-red-700">
            <img src={profileImage} alt="프로필 이미지" />
          </div>
          <div className="space-y-1">
            <h2 className="font-bold">{profileName}</h2>
            <div className="text-sm font-extralight">{date.slice(0, 10)}</div>
          </div>
        </div>
        <div className="space-y-2">
          <h3>{content}</h3>
          <ImageSlider postImages={postImages} imageSize="468" />
        </div>
        <div className="flex  justify-between">
          <div className="flex items-center gap-2">
            <HeartIcon />
            <CommentIcon />
          </div>
          <div className="flex gap-2">
            {hashtags?.map((hashtag, index) => {
              if (index === 4) {
                return '...';
              }
              if (index > 4) {
                return null;
              }
              return <h3>{hashtag}</h3>;
            })}
          </div>
        </div>
        <h3
          onClick={openModal}
          className="cursor-pointer font-bold"
          onKeyUp={openModal}
          role="presentation"
        >
          좋아요 {likes?.length}개
        </h3>
        <div>
          <Comment comments={comments} />
        </div>
        <div />
      </div>
      <DefaultModal
        isOpen={isModalOpen}
        onClose={closeModal}
        modalMaxHeight="400"
      >
        <div className="w-[200px] space-y-6">
          {likes?.map((likeObject) => {
            return (
              <div className="flex items-center justify-between ">
                <div className="aspect-square w-[48px] overflow-hidden rounded-full">
                  <img
                    src={likeObject.image}
                    alt="좋아요 누른 사용자 이미지"
                    className="object-cover"
                  />
                </div>
                <div>{likeObject.name}</div>
              </div>
            );
          })}
        </div>
      </DefaultModal>
    </article>
  );
};

export default PostItem;
