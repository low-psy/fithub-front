import React, { useRef, useState } from 'react';
import { PostComment } from '../../types/post';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface CommentsProps {
  comments?: PostComment[];
  count: number;
  postId: number;
}

const Comment: React.FunctionComponent<CommentsProps> = ({
  comments,
  count,
  postId,
}) => {
  const [isComment, setIsComment] = useState<boolean>(false);
  const [visibleReplies, setVisibleReplies] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [replyTo, setReplyTo] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);

  const handleToggleCmt = () => {
    setIsComment((prev) => !prev);
  };
  const handleToggleReply = (replyId: string) => {
    setVisibleReplies((prevVisibleReplies) => {
      if (prevVisibleReplies.includes(replyId)) {
        return prevVisibleReplies.filter((id) => id !== replyId);
      }
      return [...prevVisibleReplies, replyId];
    });
  };
  const handleReplyClick = (name: string) => {
    const replyPrefix = `@${name} `;
    setReplyTo(replyPrefix);
    setInputValue(replyPrefix);
    inputRef.current?.focus();
  };

  const handleChange = () => {
    const newValue = inputRef.current?.value;

    if (!newValue?.startsWith(replyTo)) {
      setInputValue(replyTo);
    } else {
      setInputValue(newValue);
    }
  };

  const commentPostedHandler = () => {
    console.log('suceess');
    setInputValue(''); // input value 초기화
  };

  return (
    <ul className="space-y-4">
      {count > 0 ? (
        <div>
          <button type="button" onClick={handleToggleCmt}>
            {!isComment ? `댓글 ${count}개 보기...` : '댓글 닫기'}
          </button>
        </div>
      ) : null}
      {isComment ? (
        <div className="max-h-[300px] space-y-3 overflow-auto">
          {comments?.map((comment) => {
            return (
              <div key={comment.commentId} className="space-y-4">
                <CommentItem
                  comment={comment}
                  onReplyClick={handleReplyClick}
                />
                {comment.childComment && (
                  <div className="space-y-4 pl-16 ">
                    <button
                      type="button"
                      className=" text-sm"
                      onClick={() =>
                        handleToggleReply(comment.profileInputName)
                      }
                    >
                      <span className="mr-1 inline-block h-[1px] w-6 bg-slate-500 align-middle" />
                      {!visibleReplies.includes(comment.profileInputName)
                        ? `답글 보기 (${count})`
                        : '답글 숨기기'}
                    </button>
                    {visibleReplies.includes(comment.profileInputName) &&
                      comment.childComment.map((reply) => {
                        return (
                          <div>
                            {/* <CommentItem
                              key={reply.name}
                              comment={reply}
                              onReplyClick={handleReplyClick}
                            /> */}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
      <CommentForm
        postId={postId}
        inputValue={inputValue}
        onInputChange={handleChange}
        inputRef={inputRef}
        onCommentPosted={commentPostedHandler}
        parentCommentId={0}
      />
    </ul>
  );
};

export default Comment;
