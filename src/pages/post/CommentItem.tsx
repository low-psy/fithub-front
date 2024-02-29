import React from 'react';
import { CommentInfoDto } from '../../types/swagger/model/commentInfoDto';

interface CommentItemProps {
  comment: CommentInfoDto;
  onReplyClick: (replyTo: string, replyId: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReplyClick }) => {
  return (
    <div className=" flex gap-3 ">
      <div className="flex shrink-0 grow-0 items-start">
        <div className="aspect-square w-[36px]  overflow-hidden  rounded-full border-[1px]">
          <img
            src={comment.writerProfileUrl}
            alt="답글을 단 사람의 이미지"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex flex-wrap items-start gap-x-3 gap-y-1">
          <h3 className="text-sm font-bold">{comment.writerNickName}</h3>
          <p className="text-sm">{comment.content}</p>
        </div>
        <div>
          <button
            type="button"
            className="block text-xs"
            onClick={() => {
              onReplyClick(
                comment.writerNickName as string,
                comment.commentId as number,
              );
            }}
          >
            답글달기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
