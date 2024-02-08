import { AxiosError } from 'axios';
import React from 'react';
import {
  LoaderFunction,
  LoaderFunctionArgs,
  useLoaderData,
} from 'react-router-dom';
import { getDetailPost } from '../../apis/post';
import { LoaderData } from '../../types/training';
import ImageSlider from '../../components/common/ImageSlice';
import ProfileSection from '../../components/item/ProfileSection';
import Comment from '../../components/common/Comment';
import CommentForm from '../../components/common/CommentForm';
import { useAppSelector } from '../../hooks/reduxHooks';

export const loader = (async ({ params, request }: LoaderFunctionArgs) => {
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
  console.log(parentCommentId);
  const detailPost = response.data;

  console.log(detailPost);
  const { writerInfo } = detailPost.postOutlineDto.postInfo;

  return (
    <section className="flex">
      <article className="basis-1/2">
        {detailPost.postOutlineDto.postInfo.documentUrls && (
          <ImageSlider
            postImages={detailPost.postOutlineDto.postInfo.documentUrls}
          />
        )}
      </article>
      <article className="basis-1/2">
        <div className="border-b-[1px] border-zinc-300  p-3">
          <ProfileSection
            profileImage={writerInfo?.profileUrl}
            profileName={writerInfo?.nickname}
            profileWidth="36px"
          />
        </div>
        <div className="h-[500px] overflow-auto border-b-[1px] border-zinc-300">
          <div className="p-3">
            <Comment comments={detailPost.postComments} />
          </div>
        </div>
        <div className="p-3">
          <CommentForm
            postId={detailPost.postOutlineDto.postInfo.postId}
            parentCommentId={parentCommentId}
          />
        </div>
        <div />
      </article>
    </section>
  );
};

export default DetailPost;
