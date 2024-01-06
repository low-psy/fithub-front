import React, { useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import { CommentDto } from '../../types/post';
import CommentItem from './CommentItem';

interface CommentsProps {
  comments?: CommentDto[];
}

const Comment: React.FunctionComponent<CommentsProps> = ({ comments }) => {
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

  return (
    <Form className="space-y-4">
      <div>
        <button type="button" onClick={handleToggleCmt}>
          {!isComment ? `댓글 ${comments?.length}개 보기...` : '댓글 닫기'}
        </button>
      </div>
      {isComment ? (
        <div className="max-h-[300px] space-y-3 overflow-auto">
          {comments?.map((comment) => {
            return (
              <div key={comment.name} className="space-y-4">
                <CommentItem
                  comment={comment}
                  onReplyClick={handleReplyClick}
                />
                {comment.reply && (
                  <div className="space-y-4 pl-16 ">
                    <button
                      type="button"
                      className=" text-sm"
                      onClick={() => handleToggleReply(comment.name)}
                    >
                      <span className="mr-1 inline-block h-[1px] w-6 bg-slate-500 align-middle" />
                      {!visibleReplies.includes(comment.name)
                        ? `답글 보기 (${comment.reply?.length})`
                        : '답글 숨기기'}
                    </button>
                    {visibleReplies.includes(comment.name) &&
                      comment.reply.map((reply) => {
                        return (
                          <div>
                            <CommentItem
                              key={reply.name}
                              comment={reply}
                              onReplyClick={handleReplyClick}
                            />
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
      <input
        ref={inputRef}
        value={inputValue}
        placeholder="댓글 달기..."
        onChange={handleChange}
        className="w-full rounded-md p-2 outline-none"
      />
    </Form>
  );
};

export default Comment;
