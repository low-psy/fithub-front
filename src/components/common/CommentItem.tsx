import React from 'react';
import { PostComment } from '../../types/post';

interface CommentItemProps {
  comment: PostComment;
  onReplyClick: (name: string) => void;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, onReplyClick }) => {
  return (
    <div className=" flex items-start gap-4">
      <div className="aspect-square w-[48px] overflow-hidden rounded-full">
        <img
          src={comment.profileUrl}
          alt="답글을 단 사람의 이미지"
          className="object-cover"
        />
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex gap-2">
            <h3 className="font-bold">{comment.profileInputName}</h3>
            <p>{comment.content}</p>
          </div>
          <div>
            <button
              type="button"
              className="text-sm"
              onClick={() => onReplyClick(comment.profileInputName)}
            >
              답글달기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
