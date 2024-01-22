import React, { useState } from 'react';
import testImg from '../../../assets/naver_symbol.png';
import img1 from '../../../assets/mapFilter.png';
import img2 from '../../../assets/newpostFilter.png';
import Comments from './Comments';

interface ISVGProps {
  clicked: boolean;
  onClick: () => void;
}

const LikeSVG = ({ clicked, onClick }: ISVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="24"
    fill="none"
    onClick={onClick}
    className="cursor-pointer"
  >
    <path
      stroke={clicked ? '#FF0000' : '#000'}
      fill={clicked ? '#FF0000' : '#FFF'}
      strokeLinejoin="round"
      strokeWidth="2"
      d="M25 8.165c0 1.89-.713 3.706-1.985 5.049-2.93 3.092-5.77 6.316-8.809 9.297a1.733 1.733 0 0 1-2.467-.055l-8.754-9.242C.338 10.42.338 5.91 2.985 3.116c2.672-2.82 7.024-2.82 9.697 0l.318.336.318-.335C14.598 1.763 16.344 1 18.166 1c1.823 0 3.568.763 4.849 2.116C24.288 4.46 25 6.275 25 8.165Z"
    />
  </svg>
);

const CommentSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="31"
    height="34"
    fill="none"
    className="cursor-pointer"
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5.038 29.75V11.333c0-1.127.398-2.208 1.107-3.005.708-.797 1.669-1.245 2.67-1.245H21.41c1.001 0 1.962.448 2.67 1.245.71.797 1.107 1.878 1.107 3.005v8.5c0 1.128-.398 2.209-1.106 3.006-.709.797-1.67 1.244-2.671 1.244H10.075L5.038 29.75ZM10.074 12.75h10.074M10.074 18.417h7.556"
    />
  </svg>
);

const LikedProfileSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="20"
    fill="none"
    className="mr-1"
  >
    <circle cx="38" cy="10" r="10" fill="#fff" />
    <path
      fill="#24DC36"
      d="M38 0c-5.524 0-10 4.476-10 10s4.476 10 10 10 10-4.476 10-10S43.524 0 38 0Zm0 3.871a3.548 3.548 0 1 1 0 7.097 3.548 3.548 0 0 1 0-7.097Zm0 13.87a7.727 7.727 0 0 1-5.907-2.75c.758-1.426 2.242-2.41 3.971-2.41.097 0 .194.016.287.044.524.17 1.072.278 1.649.278s1.129-.109 1.65-.278a.987.987 0 0 1 .285-.044c1.73 0 3.214.984 3.972 2.41A7.727 7.727 0 0 1 38 17.742Z"
    />
    <circle cx="24" cy="10" r="10" fill="#fff" />
    <path
      fill="#F66"
      d="M24 0c-5.524 0-10 4.476-10 10s4.476 10 10 10 10-4.476 10-10S29.524 0 24 0Zm0 3.871a3.548 3.548 0 1 1 0 7.097 3.548 3.548 0 0 1 0-7.097Zm0 13.87a7.727 7.727 0 0 1-5.907-2.75c.758-1.426 2.242-2.41 3.971-2.41.097 0 .194.016.287.044.524.17 1.072.278 1.649.278s1.129-.109 1.65-.278a.987.987 0 0 1 .286-.044c1.73 0 3.213.984 3.971 2.41A7.727 7.727 0 0 1 24 17.742Z"
    />
    <circle cx="10" cy="10" r="10" fill="#fff" />
    <path
      fill="#9766FF"
      d="M10 0C4.476 0 0 4.476 0 10s4.476 10 10 10 10-4.476 10-10S15.524 0 10 0Zm0 3.871a3.548 3.548 0 1 1 0 7.097 3.548 3.548 0 0 1 0-7.097Zm0 13.87a7.727 7.727 0 0 1-5.907-2.75c.758-1.426 2.242-2.41 3.972-2.41.096 0 .193.016.286.044.524.17 1.072.278 1.649.278s1.129-.109 1.65-.278a.987.987 0 0 1 .285-.044c1.73 0 3.214.984 3.972 2.41A7.727 7.727 0 0 1 10 17.742Z"
    />
  </svg>
);

const Post = () => {
  const [likeClicked, setLikeClicked] = useState<boolean>(false);
  const [commentDisplay, setCommentDisplay] = useState<boolean>(false);
  const handleLikeClicked = () => {
    setLikeClicked(!likeClicked);
  };
  const handleCommentDisplay = () => {
    setCommentDisplay(!commentDisplay);
  };

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-300 p-4 shadow">
      {/* 헤더 */}
      <div className="flex flex-row items-center">
        <img src={testImg} alt="profile_img" className="h-16 w-16" />
        <div className="ml-4">
          <p className="font-bold">송민우</p>
          <p className="text-sm text-gray-500">
            2023년 11월 12일 (일) 오후 6:30
          </p>
        </div>
      </div>
      {/* 내용 */}
      <div>오운완!</div>
      {/* 이미지 리스트 */}
      <div className="flex h-60 flex-row gap-1 overflow-x-auto">
        <img src={img1} alt="img1" />
        <img src={img2} alt="img2" />
      </div>
      {/* 버튼들 */}
      <div className="flex flex-row items-center gap-2">
        <LikeSVG clicked={likeClicked} onClick={handleLikeClicked} />
        <CommentSVG />
      </div>
      {/* 좋아요 정보  */}
      <div className="flex flex-row items-center">
        <LikedProfileSVG />
        <p>
          <span className="font-semibold">강지륜</span> 님 외 여러명
        </p>
      </div>
      {/* 댓글 */}
      <div className=" text-gray-700">
        <p
          onClick={handleCommentDisplay}
          aria-hidden
          className="cursor-pointer"
        >
          댓글 2개 보기
        </p>
        {commentDisplay && <Comments display={commentDisplay} />}
      </div>
    </div>
  );
};

export default Post;
