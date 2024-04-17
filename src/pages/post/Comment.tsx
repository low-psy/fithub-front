import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import CommentItem from './CommentItem';
import { SET_REPLY_TO } from '../../redux/slices/commentSlice';
import { deleteComment, getChildComments } from '../../apis/post';
import { ParentCommentInfoDto } from '../../types/swagger/model/parentCommentInfoDto';
import { CommentInfoDto } from '../../types/swagger/model/commentInfoDto';
import DropdownMenu from '../../components/btn/DropdownMenu';
import { errorFunc } from '../../utils/util';

interface CommentsProps {
  comments?: ParentCommentInfoDto[];
  postId: number;
}

const Comment: React.FC<CommentsProps> = ({ comments, postId }) => {
  console.log(comments);
  const [replyVisibles, setReplyVisibles] = useState<number[]>([]);
  const [childCommentsMap, setChildCommentsMap] = useState<{
    [key: number]: CommentInfoDto[];
  }>({});
  const dispatch = useDispatch();

  const fetchChildComments = async (commentId: number) => {
    if (!postId || replyVisibles.includes(commentId)) return; // 이미 불러온 데이터는 다시 불러오지 않음
    try {
      const res = await getChildComments(postId, commentId);
      console.log(res);
      if (res.status === 200 && res.data) {
        setChildCommentsMap((prev) => ({
          ...prev,
          [commentId]: res.data as CommentInfoDto[],
        }));
      }
    } catch (err) {
      const error = err as AxiosError<unknown>;
      console.error(error.message);
    }
  };

  const handleToggleReply = (commentId: number) => {
    fetchChildComments(commentId); // 클릭 시 자식 댓글 불러오기
    setReplyVisibles((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    );
  };

  const handleReplyClick = (replyTo: string, replyId: number) => {
    dispatch(SET_REPLY_TO({ replyId, replyTo }));
  };
  const navigate = useNavigate();
  const deleteHandler = async (commentId: number | undefined) => {
    if (commentId) {
      try {
        const res = await deleteComment(commentId);
        if (res.status === 200) {
          return navigate(0);
        }
      } catch (err) {
        errorFunc(err);
        navigate('/post');
      }
    }
  };
  const editHandler = (
    writer: string | undefined,
    comment: string | undefined,
    id: number | undefined,
  ) => {
    if (writer && comment) {
      dispatch(
        SET_REPLY_TO({ replyTo: writer, replyId: id as number, comment }),
      );
    }
  };

  const renderComments = (
    commentId: number,
    childComments: CommentInfoDto[],
  ) => {
    return (
      <div className="space-y-3 pl-12 text-sm">
        {childComments.map((childComment) => (
          <li key={childComment.commentId} className="space-y-2">
            <div className="flex justify-between">
              <CommentItem
                comment={childComment}
                onReplyClick={handleReplyClick}
              />
              <DropdownMenu
                menuArray={['수정하기', '삭제하기']}
                onMenuItemClick={(value: string) => {
                  if (value === '수정하기') {
                    editHandler(
                      childComment.writerNickName,
                      childComment.content,
                      childComment.commentId,
                    );
                  } else {
                    deleteHandler(childComment.commentId);
                  }
                }}
              />
            </div>
            {childComment.childComments &&
              childComment.childComments?.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    handleToggleReply(childComment.commentId as number)
                  }
                  className="pl-12 text-xs font-bold"
                >
                  {replyVisibles.includes(childComment.commentId as number)
                    ? '-----답글 숨기기'
                    : '------답글 보기'}
                </button>
              )}
            {replyVisibles.includes(childComment.commentId as number) &&
              childCommentsMap[childComment.commentId as number] &&
              renderComments(
                childComment.commentId as number,
                childCommentsMap[childComment.commentId as number],
              )}
          </li>
        ))}
      </div>
    );
  };

  const userEmail = localStorage.getItem('email');
  console.log(userEmail);
  return (
    <ul className="space-y-4">
      {comments?.map((comment) => (
        <li key={comment.commentId} className="space-y-2">
          <div className="flex justify-between">
            <CommentItem comment={comment} onReplyClick={handleReplyClick} />
            {comment.writerEmail === userEmail && (
              <DropdownMenu
                menuArray={['수정하기', '삭제하기']}
                onMenuItemClick={(value: string) => {
                  if (value === '수정하기') {
                    editHandler(
                      comment.writerNickName,
                      comment.content,
                      comment.commentId,
                    );
                  } else {
                    deleteHandler(comment.commentId);
                  }
                }}
              />
            )}
          </div>
          {comment.hasChildComment && (
            <button
              type="button"
              onClick={() => handleToggleReply(comment.commentId as number)}
              className="pl-12 text-xs font-bold"
            >
              {replyVisibles.includes(comment.commentId as number)
                ? '-----답글 숨기기'
                : '------답글 보기'}
            </button>
          )}
          {replyVisibles.includes(comment.commentId as number) &&
            childCommentsMap[comment.commentId as number] &&
            renderComments(
              comment.commentId as number,
              childCommentsMap[comment.commentId as number],
            )}
        </li>
      ))}
    </ul>
  );
};

export default Comment;
