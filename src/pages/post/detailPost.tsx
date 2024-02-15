import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActionFunctionArgs,
  LoaderFunction,
  LoaderFunctionArgs,
  json,
  redirect,
  useLoaderData,
} from 'react-router-dom';
import { getDetailPost, getParentComments, postComment } from '../../apis/post';
import { LoaderData } from '../../types/training';
import ImageSlider from '../../components/common/ImageSlice';
import ProfileSection from '../../components/item/ProfileSection';
import Comment from '../../components/common/Comment';
import CommentForm from '../../components/common/CommentForm';
import { useAppSelector } from '../../hooks/reduxHooks';
import { ParentCommentInfoDto } from '../../types/swagger/model/parentCommentInfoDto';

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
        const error = err as AxiosError<unknown>;
        alert(error.message);
      }
    };
    fetchParentComments();
  }, [postId, cmt]);

  return (
    <section className="flex">
      <article className="basis-1/2">
        {documentUrls && <ImageSlider postImages={documentUrls} />}
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
            <Comment comments={parentComments} postId={postId || 0} />
          </div>
        </div>
        <div className="p-3">
          <CommentForm postId={postId} parentCommentId={parentCommentId} />
        </div>
        <div />
      </article>
    </section>
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
};

export default DetailPost;
