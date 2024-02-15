import React, { useState } from 'react';
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
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import CommentForm from '../common/CommentForm';
import RoundedIcon from '../common/icon/Rounded';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';
import { LikesInfoDto } from '../../types/swagger/model/likesInfoDto';
import { postBook, deleteBook } from '../../apis/post';
import { formatDate } from '../../utils/util';

interface PostItemProps extends PostInfoDto {
  postUse?: string;
  bookAndLikes: LikesBookmarkStatusDto;
  likedCount: number | undefined;
  likedUsers: LikesInfoDto[] | undefined;
  // 기타 필요한 추가 props
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
  createdDate,
  modifiedDate,
  content,
  hashTags,
  views,
  documentUrls,
  postCommentsCount,
  postUse,
  bookAndLikes,
  postId,
  writerInfo,
  likedCount,
  likedUsers,
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
    bookAndLikes.postId,
    bookAndLikes.likesStatus,
    likedCount,
  );
  const { isBooked, toggleBook } = useBook(
    bookAndLikes.postId,
    bookAndLikes.bookmarkStatus,
    postBook,
    deleteBook,
  );
  const date = formatDate(createdDate?.toString());

  return (
    <article key={postId}>
      <div className="space-y-4  bg-white p-4 shadow-sm drop-shadow-xl ">
        <div className="flex items-center justify-between ">
          <ProfileSection
            profileName={writerInfo?.nickname}
            profileImage={writerInfo?.profileUrl}
            date={date}
          />
          {postUse === 'update' && (
            <DropdownMenu onMenuItemClick={handleMenuItemClick} />
          )}
        </div>
        <div className="space-y-4">
          <h3 className="pl-1">{content}</h3>
          {documentUrls && (
            <ImageSlider postImages={documentUrls} imageSize="468" />
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
          <Hashtags hashtags={hashTags} />
        </div>
        <LikesSection
          likes={likesCount}
          onLikesClick={() => toggleModal('likeModal')}
        />
        <div>
          {postCommentsCount && postCommentsCount > 0 ? (
            <div>
              <Link to={`${postId}`} state={{ isModal: true }}>
                {`댓글 ${postCommentsCount}개 보기...`}
              </Link>
            </div>
          ) : null}
          <CommentForm postId={postId} parentCommentId={0} />
        </div>
        <div />
      </div>
      <DefaultModal
        isOpen={modalsOpen.likeModal}
        onClose={() => toggleModal('likeModal')}
        modalMaxHeight="400px"
      >
        <ul className="w-[200px] space-y-6">
          {likedUsers?.map((likeInfoDto) => {
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
            content={content}
            images={documentUrls}
            hashTags={hashTags}
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
