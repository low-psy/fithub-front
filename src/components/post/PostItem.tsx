import React, { useState } from 'react';
import HeartIcon from '../../assets/icons/HeartIcon';
import { Post } from '../../types/post';
import ImageSlider from '../common/ImageSlice';
import DefaultModal from '../common/module/DefaultModal';
import Comment from '../common/Comment';
import ProfileSection from '../item/ProfileSection';
import Hashtags from '../item/HashTags';
import LikesSection from '../item/LikesSection';
import DropdownMenu from '../common/DropdownMenu';
import PostForm from './PostForm';
import DeleteItem from '../common/DeleteItem';
import PostBookmarkIcon from '../../assets/icons/PostBookmarkIcon';
import Button from '../common/\bButton';
import useLike from '../../hooks/likeHook';
import useBook from '../../hooks/bookHook';

interface PostItemProps extends Post {
  postUse?: string;
  // 기타 필요한 추가 props
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
  bookmark,
  liked,
  postComments,
  postContent,
  postCreatedDate,
  postDocumentUrls,
  postHashTags,
  postId,
  postLikedUser,
  postWriter,
  postWriterProfileUrl,
  postUse,
  postCommentsCount,
  postLikesCount,
}) => {
  const [modalsOpen, setModalsOpen] = useState<{ [key: string]: boolean }>({
    deleteModal: false,
    editModal: false,
    likeModal: false,
    // 기타 모달 상태
  });
  const toggleModal = (modalName: string) => {
    setModalsOpen((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const handleMenuItemClick = (value: string) => {
    if (value === '수정하기') {
      toggleModal('editModal');
    } else if (value === '삭제하기') {
      toggleModal('deleteModal');
    }
  };
  const { isLiked, likesCount, toggleLike } = useLike(
    postId.toString(),
    liked,
    postLikesCount,
  );
  const { isBooked, toggleBook } = useBook(postId.toString(), bookmark);
  return (
    <article key={postId}>
      <div className="space-y-6  bg-white p-4 shadow-sm drop-shadow-xl ">
        <div className="flex items-center justify-between ">
          <ProfileSection
            profileName={postWriter}
            profileImage={postWriterProfileUrl}
            date={postCreatedDate}
          />
          {postUse === 'update' && (
            <DropdownMenu onMenuItemClick={handleMenuItemClick} />
          )}
        </div>
        <div className="space-y-4">
          <h3 className="pl-1">{postContent}</h3>
          <ImageSlider postImages={postDocumentUrls} imageSize="468" />
        </div>
        <div className="flex  justify-between">
          <div className="flex items-center gap-4">
            <Button onClick={toggleLike}>
              <HeartIcon liked={isLiked} />
            </Button>
            <Button onClick={toggleBook}>
              <PostBookmarkIcon booked={isBooked} />
            </Button>
          </div>
          <Hashtags hashtags={postHashTags} />
        </div>
        <LikesSection
          likes={likesCount}
          onLikesClick={() => toggleModal('likeModal')}
        />
        <div>
          <Comment
            comments={postComments}
            count={postCommentsCount}
            postId={postId}
          />
        </div>
        <div />
      </div>
      <DefaultModal
        isOpen={modalsOpen.likeModal}
        onClose={() => toggleModal('likeModal')}
        modalMaxHeight="400px"
      >
        <ul className="w-[200px] space-y-6">
          {postLikedUser?.map((likeObject) => {
            return (
              <li
                className="flex items-center justify-between "
                key={likeObject.likedUser}
              >
                <div className="aspect-square w-[48px] overflow-hidden rounded-full">
                  <img
                    src={likeObject.likedUserProfileUrl}
                    alt="좋아요 누른 사용자 이미지"
                    className="object-cover"
                  />
                </div>
                <div>{likeObject.likedUser}</div>
              </li>
            );
          })}
        </ul>
      </DefaultModal>
      <DefaultModal
        isOpen={modalsOpen.editModal}
        onClose={() => toggleModal('editModal')}
        modalMaxHeight="600px"
        modalWidth="1000px"
      >
        <div className="w-full space-y-6">
          <PostForm
            content={postContent}
            images={postDocumentUrls}
            hashTags={postHashTags}
            useCase="update"
            id={postId}
          />
        </div>
      </DefaultModal>
      <DefaultModal
        isOpen={modalsOpen.deleteModal}
        onClose={() => toggleModal('deleteModal')}
        modalMaxHeight="400"
      >
        <div className="w-[400px] space-y-6">
          <DeleteItem id={postId} action="/profile/mypost" itemName="게시물" />
        </div>
      </DefaultModal>
    </article>
  );
};

export default PostItem;
