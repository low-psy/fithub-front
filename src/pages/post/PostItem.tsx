import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import ImageSlider from '../../components/imageSlider/ImageBtnSlider';
import DefaultModal from '../../components/modal/DefaultModal';
import ProfileSection from '../../components/common/ProfileSection';
import Hashtags from '../../components/common/HashTags';
import LikesSection from './LikesSection';
import DropdownMenu from '../../components/btn/DropdownMenu';
import PostForm from '../newpost/PostForm';
import useLike from '../../hooks/likeHook';
import useBook from '../../hooks/bookHook';
import { LikesBookmarkStatusDto } from '../../types/swagger/model/likesBookmarkStatusDto';
import CommentForm from './CommentForm';
import RoundedIcon from '../../components/icon/Rounded';
import { PostInfoDto } from '../../types/swagger/model/postInfoDto';
import { LikesInfoDto } from '../../types/swagger/model/likesInfoDto';
import { postBook, deleteBook, deletePost } from '../../apis/post';
import { formatDate } from '../../utils/util';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { SET_CHATTING_ROOM_ID } from '../../redux/slices/chatSlice';

interface PostItemProps extends PostInfoDto {
  bookAndLikes: LikesBookmarkStatusDto;
  likedUsers: LikesInfoDto[] | undefined;
  // 기타 필요한 추가 props
  onClick?: () => void;
}

const PostItem: React.FunctionComponent<PostItemProps> = ({
  createdDate,
  content,
  hashTags,
  documentUrls,
  postCommentsCount,
  bookAndLikes,
  postId,
  writerInfo,
  likedUsers,
  onClick,
}) => {
  const dispatch = useAppDispatch();
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
    } else if (value === '채팅하기') {
      dispatch(SET_CHATTING_ROOM_ID(1)); // id TODO
    }
  };
  const { isLiked, toggleLike } = useLike(
    bookAndLikes?.postId,
    bookAndLikes?.likesStatus,
    onClick,
  );
  const { isBooked, toggleBook } = useBook(
    bookAndLikes?.postId,
    bookAndLikes?.bookmarkStatus,
    postBook,
    deleteBook,
  );
  const date = formatDate(createdDate?.toString());

  const navigate = useNavigate();

  const btnDeleteHandler = async () => {
    try {
      const res = await deletePost(postId as number);
      if (res.status === 200) {
        navigate('/post');
      } else {
        throw new Error(`Server is trouble with${res.status}`);
      }
    } catch (err) {
      const error = err as AxiosError<unknown>;
      if (error.status === 200) {
        alert('해당 회원읜 게시글 작성자가 아닙니다');
      } else if (error.status === 409) {
        alert('댓글이 있어 게시글 삭제 불가');
      }
      navigate('/post');
    }
  };
  const isWriter = localStorage.getItem('email') === writerInfo?.email;
  return (
    <article key={postId} className="mb-12">
      <div className="space-y-4  bg-white p-4 shadow-sm drop-shadow-xl ">
        <div className="flex items-center justify-between ">
          <DropdownMenu
            onMenuItemClick={handleMenuItemClick}
            menuArray={['게시글 보기', '채팅하기']}
            className="left-14 top-0 cursor-pointer"
          >
            <ProfileSection
              profileName={writerInfo?.nickname}
              profileImage={writerInfo?.profileUrl}
              date={date}
            />
          </DropdownMenu>
          {isWriter && (
            <DropdownMenu
              onMenuItemClick={handleMenuItemClick}
              menuArray={['수정하기', '삭제하기']}
            />
          )}
        </div>
        <div className="space-y-4">
          <h3 className="pl-1">{content}</h3>
          {documentUrls && (
            <div>
              <ImageSlider postImages={documentUrls} imageSize="500px" />
            </div>
          )}
        </div>
        <div className="flex  justify-between">
          <div className="relative flex items-center gap-2">
            <RoundedIcon
              defaultState={isLiked}
              onClick={toggleLike}
              iconColor="text-main"
            >
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
          likes={likedUsers}
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
                    className="h-full w-full object-cover"
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
            useCase="put"
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
          <div>정말 게시물을 삭제 하시겠습니까?</div>
          <div className="text-right">
            <button
              type="button"
              className="rounded-full bg-slate-200 px-6 py-1"
              onClick={btnDeleteHandler}
            >
              삭제
            </button>
          </div>
        </div>
      </DefaultModal>
    </article>
  );
};

export default PostItem;
