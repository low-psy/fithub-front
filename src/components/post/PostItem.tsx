import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../common/ImageSlice';
import DefaultModal from '../common/module/DefaultModal';
import ProfileSection from '../item/ProfileSection';
import Hashtags from '../item/HashTags';
import LikesSection from '../item/LikesSection';
import DropdownMenu from '../common/DropdownMenu';
import PostForm from './PostForm';
import DeleteItem from '../common/DeleteItem';
import useLike from '../../hooks/likeHook';
import useBook from '../../hooks/bookHook';
import { formatDate } from '../item/TrainerItem';
import { PostOutlineDto } from '../../types/swagger/model/postOutlineDto';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import CommentForm from '../common/CommentForm';
import RoundedIcon from '../common/icon/Rounded';

interface PostItemProps extends PostOutlineDto {
  postUse?: string;
  bookAndLikes: LikesBookmarkStatusDto;
  // 기타 필요한 추가 props
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
  postInfo,
  postLikedInfo,
  postCommentsCount,
  postUse,
  bookAndLikes,
}) => {
  console.log(postCommentsCount);
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
    bookAndLikes.postId,
    bookAndLikes.likesStatus,
    postLikedInfo.likedCount,
  );
  const { isBooked, toggleBook } = useBook(
    bookAndLikes.postId,
    bookAndLikes.bookmarkStatus,
  );
  const date = formatDate(postInfo.createdDate?.toString());

  return (
    <article key={postInfo.postId}>
      <div className="space-y-4  bg-white p-4 shadow-sm drop-shadow-xl ">
        <div className="flex items-center justify-between ">
          <ProfileSection
            profileName={postInfo.writerInfo?.nickname}
            profileImage={postInfo.writerInfo?.profileUrl}
            date={date}
          />
          {postUse === 'update' && (
            <DropdownMenu onMenuItemClick={handleMenuItemClick} />
          )}
        </div>
        <div className="space-y-4">
          <h3 className="pl-1">{postInfo.content}</h3>
          {postInfo.documentUrls && (
            <ImageSlider postImages={postInfo.documentUrls} imageSize="468" />
          )}
        </div>
        <div className="flex  justify-between">
          <div className="relative flex items-center gap-2">
            <RoundedIcon defaultState={isLiked} onClick={toggleLike}>
              favorite
            </RoundedIcon>
            <RoundedIcon
              defaultState={isBooked}
              onClick={toggleBook}
              iconColor="text-accent"
            >
              bookmark
            </RoundedIcon>
          </div>
          <Hashtags hashtags={postInfo.hashTags} />
        </div>
        <LikesSection
          likes={likesCount}
          onLikesClick={() => toggleModal('likeModal')}
        />
        <div>
          {postCommentsCount > 0 ? (
            <div>
              <Link to={`${postInfo.postId}`} state={{ isModal: true }}>
                {`댓글 ${postCommentsCount}개 보기...`}
              </Link>
            </div>
          ) : null}
          <CommentForm postId={postInfo.postId} parentCommentId={0} />
        </div>
        <div />
      </div>
      <DefaultModal
        isOpen={modalsOpen.likeModal}
        onClose={() => toggleModal('likeModal')}
        modalMaxHeight="400px"
      >
        <ul className="w-[200px] space-y-6">
          {postLikedInfo.likedUsers?.map((likeInfoDto) => {
            return (
              <li
                className="flex items-center justify-between "
                key={likeInfoDto.nickname}
              >
                <div className="aspect-square w-[48px] overflow-hidden rounded-full">
                  <img
                    src={likeInfoDto.profileUrl}
                    alt="좋아요 누른 사용자 이미지"
                    className="object-cover"
                  />
                </div>
                <div>{likeInfoDto.nickname}</div>
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
            content={postInfo.content}
            images={postInfo.documentUrls}
            hashTags={postInfo.hashTags}
            useCase="update"
            id={postInfo.postId}
          />
        </div>
      </DefaultModal>
      <DefaultModal
        isOpen={modalsOpen.deleteModal}
        onClose={() => toggleModal('deleteModal')}
        modalMaxHeight="400"
      >
        <div className="w-[400px] space-y-6">
          <DeleteItem
            id={postInfo.postId}
            action="/profile/mypost"
            itemName="게시물"
          />
        </div>
      </DefaultModal>
    </article>
  );
};

export default PostItem;
