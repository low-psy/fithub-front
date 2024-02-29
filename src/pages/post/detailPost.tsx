import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
  useLoaderData,
  useOutletContext,
} from 'react-router-dom';
import { getDetailPost, getParentComments, postComment } from '../../apis/post';
import { LoaderData } from '../../types/common';
import ImageSlider from '../../components/imageSlider/ImageBtnSlider';
import ProfileSection from '../../components/common/ProfileSection';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ParentCommentInfoDto } from '../../types/swagger/model/parentCommentInfoDto';
import { errorFunc } from '../../utils/util';
import LikesSection from './LikesSection';
import DefaultModal from '../../components/modal/DefaultModal';
import useModal from '../../hooks/useModal';
import { LikesInfoDto } from '../../types/swagger/model/likesInfoDto';
import RoundedIcon from '../../components/icon/Rounded';
import Hashtags from '../../components/common/HashTags';

interface Context {
  likedUsers: LikesInfoDto[] | undefined;
  isLiked: boolean;
  isBooked: boolean;
  toggleLike: () => Promise<void>;
  toggleBook: () => Promise<void>;
}

export const loader = (async ({ params }: LoaderFunctionArgs) => {
  const { postId } = params;
  try {
    const response = await getDetailPost(Number(postId));
    if (response && response.status === 200) {
      return response;
    }
    return response;
  } catch (err) {
    const error = err as unknown as AxiosError;
    throw error;
  }
}) satisfies LoaderFunction;

const DetailPost = () => {
  const response = useLoaderData() as LoaderData<typeof loader>;
  const cmt = useAppSelector((state) => state.comment);
  const parentCommentId = cmt.selectReplyId || undefined;
  const detailPost = response.data;
  const { likedUsers, isLiked, isBooked, toggleLike, toggleBook } =
    useOutletContext<Context>();

  const likedModal = useModal();

  const [parentComments, setParentComments] = useState<ParentCommentInfoDto[]>([
    {
      commentId: 0,
      writerNickName: '',
      content: '',
      writerProfileUrl: '',
      createdDate: new Date(),
      hasChildComment: false,
    },
  ]);

  const { writerInfo, documentUrls, postId } = detailPost;

  useEffect(() => {
    const fetchParentComments = async () => {
      if (!postId) return;
      try {
        const res = await getParentComments(postId);
        if (res.status === 200) {
          setParentComments(res.data.content || []);
        } else {
          throw new Error(`Server responded with status: ${res.status}`);
        }
      } catch (err) {
        errorFunc(err);
      }
    };
    fetchParentComments();
  }, [postId, cmt]);

  return (
    <>
      <section className="flex h-full flex-col bg-white md:flex-row">
        <article className="md:basis-1/2">
          <div className="flex h-full items-center">
            {documentUrls && <ImageSlider postImages={documentUrls} />}
          </div>
        </article>
        <article className="flex grow flex-col border-[1px] border-zinc-300 md:basis-1/2">
          <div className="border-b-[1px] border-zinc-300  p-3">
            <ProfileSection
              profileImage={writerInfo?.profileUrl}
              profileName={writerInfo?.nickname}
              profileWidth="36px"
            />
          </div>
          <div className="grow overflow-auto border-b-[1px] border-zinc-300">
            <div className="p-3">
              <Comment comments={parentComments} postId={postId || 0} />
            </div>
          </div>
          <div className="flex  justify-between">
            <div className="relative flex items-center gap-2 p-3">
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
          </div>
          <div className=" border-zinc-300 p-3 pt-0">
            <LikesSection likes={likedUsers} onLikesClick={likedModal.toggle} />
          </div>
          <div className="p-3 pt-0">
            <CommentForm postId={postId} parentCommentId={parentCommentId} />
          </div>
        </article>
      </section>
      <DefaultModal
        isOpen={likedModal.isOpen}
        onClose={likedModal.toggle}
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
    </>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const content = formData.get('content')?.toString();
  const postId = Number(formData.get('postId'));
  const parentCommentId = Number(formData.get('parentCommentId'))
    ? Number(formData.get('parentCommentId'))
    : null;
  if (!content && !content?.trim()) {
    return redirect(`/post`); // 빈 입력은 무시
  }
  try {
    const response = await postComment(content, postId, parentCommentId); // postComment API 호출
    if (response.status === 200) {
      return json({ comment: true });
    }
    throw new Error('Server has trouble something');
  } catch (err) {
    const error = err as unknown as AxiosError;
    alert(error.message);
  }
  return null;
};

export default DetailPost;
