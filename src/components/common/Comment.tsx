import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import CommentItem from './CommentItem';
import { CommentInfoDto } from '../../types/swagger/model/commentInfoDto';
import { SET_REPLY_TO } from '../../redux/slices/commentSlice';

interface CommentsProps {
  comments?: CommentInfoDto[];
}

const Comment: React.FC<CommentsProps> = ({ comments }) => {
  const [replyVisibles, setReplyVisibles] = useState<number[]>([]);
  const dispatch = useDispatch();

  const handleToggleReply = (commentId: number) => {
    setReplyVisibles((prev) =>
      prev.includes(commentId)
        ? prev.filter((id) => id !== commentId)
        : [...prev, commentId],
    );
  };

  const handleReplyClick = (replyTo: string, replyId: number) => {
    dispatch(SET_REPLY_TO({ replyId, replyTo }));
  };

  // 미리 정의된 패딩 클래스
  const paddingClasses = ['pl-0', 'pl-12', 'pl-24', 'pl-36', 'pl-48'];

  const renderComments = (comments: CommentInfoDto[], level = 0) => {
    // 패딩 레벨에 따라 클래스 선택
    const paddingLeftClass =
      paddingClasses[level] || paddingClasses[paddingClasses.length - 1];
    const btnPaddingLeftClass =
      paddingClasses[level + 1] || paddingClasses[paddingClasses.length - 1];

    return comments.map((comment) => (
      <div key={comment.commentId} className={`space-y-2 ${paddingLeftClass}`}>
        <CommentItem comment={comment} onReplyClick={handleReplyClick} />
        {comment.childComments && comment.childComments.length > 0 && (
          <div className={`space-y-3 ${paddingLeftClass} text-sm`}>
            <button
              type="button"
              onClick={() =>
                comment.commentId && handleToggleReply(comment.commentId)
              }
              className={`${btnPaddingLeftClass} text-xs`}
            >
              {comment.commentId && !replyVisibles.includes(comment.commentId)
                ? `답글 보기 (${comment.childComments.length})`
                : '답글 숨기기'}
            </button>
            {comment.commentId &&
              replyVisibles.includes(comment.commentId) &&
              renderComments(comment.childComments, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return <ul className="space-y-4">{comments && renderComments(comments)}</ul>;
};

export default Comment;
